import { GnosisSafe__factory, WyvernExchange, WyvernExchange__factory } from '../typechain'
import { OpenSeaPort } from '@gsgalloway/opensea-js'
import { Network, Order } from '@gsgalloway/opensea-js/lib/types'
import { Provider, AlchemyProvider, Networkish, getNetwork } from '@ethersproject/providers'
import { BigNumber, BigNumberish } from 'ethers'
import { encodeMulti, MetaTransaction, OperationType } from 'ethers-multisend'
import _ from 'lodash'
import { buildSafeTransaction, SafeTransaction } from '@gnosis.pm/safe-contracts'

const UINT_BUY_ORDER_LISTING_TIME = 6

const wyvernExchangeAddress = {
  mainnet: '0x7Be8076f4EA4A4AD08075C2508e481d6C946D12b',
  homestead: '0x7Be8076f4EA4A4AD08075C2508e481d6C946D12b',
  rinkeby: '0x5206e78b21Ce315ce284FB24cf05e0585A93B1d9',
}

type AtomicMatchArgs = Parameters<WyvernExchange['functions']['atomicMatch_']>

enum Side {
  Buy = 0,
  Sell = 1,
}

export interface SinglePurchaseTx {
  to: string
  data: string
  value: BigNumber
}

export interface OpenseaBulkPurchaserConfig {
  alchemyApiKey?: string
  openseaApiKey?: string
  network?: Networkish
}

export default class OpenseaBulkPurchaser {
  private readonly seaport: OpenSeaPort
  private readonly wyvernExchange: WyvernExchange
  private readonly provider: Provider

  constructor(provider: Provider, config?: OpenseaBulkPurchaserConfig) {
    config = config ?? {}
    config.network = config?.network ?? 'mainnet'
    this.provider = provider
    const alchemyProvider = new AlchemyProvider(config.network, config?.alchemyApiKey)
    const networkName = getNetwork(config.network).name
    let openseaNetworkName: Network
    switch (networkName) {
      case 'mainnet':
      case 'homestead':
        openseaNetworkName = Network.Main
        break
      case 'rinkeby':
        openseaNetworkName = Network.Rinkeby
        break
      default:
        throw new Error(`network ${networkName} is not supported by opensea-js`)
    }
    this.seaport = new OpenSeaPort(alchemyProvider, {
      apiKey: config?.openseaApiKey,
      networkName: openseaNetworkName,
    })
    this.wyvernExchange = WyvernExchange__factory.connect(wyvernExchangeAddress[networkName], provider)
  }

  createSingleTokenPurchase = async (
    tokenId: BigNumberish,
    assetContractAddress: string,
    tokenRecipientAddress: string,
  ): Promise<SinglePurchaseTx> => {
    const sellOrder = await this._fetchCheapestSellOrderForToken(tokenId, assetContractAddress)
    const tx = await this.seaport.prepareFulfillOrder({
      order: sellOrder,
      accountAddress: tokenRecipientAddress,
    })
    const newTx = {
      value: BigNumber.from(tx.value?.toString()),
      to: this.wyvernExchange.address,
      data: tx.data ?? '',
    }
    return await this._fixBuyOrderListingDate(newTx)
  }

  createBatchTxFromPurchases = async (
    individualPurchases: SinglePurchaseTx[],
  ): Promise<MetaTransaction> => {
    const inputs = individualPurchases.map((tx): MetaTransaction => {
      return {
        to: tx.to,
        value: tx.value.toString(),
        data: tx.data,
        operation: OperationType.Call,
      }
    })
    return encodeMulti(inputs)
  }

  safeTransactionFromMetaTransaction = async (
    metaTransaction: MetaTransaction,
    safeAddressOrSafeNonce: string | number,
  ): Promise<SafeTransaction> => {
    let safeNonce
    if (typeof safeAddressOrSafeNonce === 'number') {
      safeNonce = safeAddressOrSafeNonce
    } else {
      safeNonce = (await GnosisSafe__factory.connect(safeAddressOrSafeNonce, this.provider).nonce()).toNumber()
    }
    return buildSafeTransaction({
      to: metaTransaction.to,
      nonce: safeNonce,
      operation: OperationType.DelegateCall,
      data: metaTransaction.data,
    })
  }

  private readonly _fetchCheapestSellOrderForToken = async (
    _tokenId: BigNumberish,
    assetContractAddress: string,
  ): Promise<Order> => {
    const tokenID = BigNumber.from(_tokenId)
    const resp = await this.seaport.api.getOrders({
      asset_contract_address: assetContractAddress,
      side: Side.Sell,
      token_id: tokenID.toString(),
    })
    const cheapestOrder = _.minBy(resp.orders, (order) => order.basePrice.toNumber())
    if (cheapestOrder === undefined) {
      throw new Error(`no orders found for token #${tokenID.toString()} of asset contract ${assetContractAddress}`)
    }
    return cheapestOrder
  }

  private readonly _fixBuyOrderListingDate = async (
    originalPurchaseTx: SinglePurchaseTx,
  ): Promise<SinglePurchaseTx> => {
    if (originalPurchaseTx.data === undefined) {
      throw new Error('tx data undefined')
    }
    const parsedTx = this.wyvernExchange.interface.parseTransaction({
      data: originalPurchaseTx.data,
    })
    const [
      addrs,
      uints,
      feeMethodsSidesKindsHowToCalls,
      calldataBuy,
      calldataSell,
      replacementPatternBuy,
      replacementPatternSell,
      staticExtradataBuy,
      staticExtradataSell,
      vs,
      rssMetadata,
    ] = parsedTx.args as AtomicMatchArgs

    const curBlockNum = await this.provider.getBlockNumber()
    const curBlock = await this.provider.getBlock(curBlockNum)
    const newTimestampForBuyOrder = curBlock.timestamp

    const newUints = [...uints]
    newUints[UINT_BUY_ORDER_LISTING_TIME] = newTimestampForBuyOrder

    const fixed = await this.wyvernExchange.populateTransaction.atomicMatch_(
      addrs,
      newUints as AtomicMatchArgs[1],
      feeMethodsSidesKindsHowToCalls,
      calldataBuy,
      calldataSell,
      replacementPatternBuy,
      replacementPatternSell,
      staticExtradataBuy,
      staticExtradataSell,
      vs,
      rssMetadata,
      { value: originalPurchaseTx.value },
    )
    if (fixed.data === undefined || fixed.to === undefined || fixed.value === undefined) {
      throw new Error('expect `data`, `to`, and `value` to be defined')
    }
    return {
      data: fixed.data,
      to: fixed.to,
      value: fixed.value,
    }
  }
}
