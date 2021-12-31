import { OpenSeaPort } from 'opensea-js'
import { Network as OpenseaNetwork, OpenSeaAsset } from 'opensea-js/lib/types'
import { Network } from '@ethersproject/networks'
import { AlchemyProvider, JsonRpcProvider } from '@ethersproject/providers'
import OpenseaBulkPurchaser, { SinglePurchaseTx } from '@standard-crypto/opensea-batch-purchaser'
import { SafeTransaction } from '@gnosis.pm/safe-contracts'

function unreachable(value: never, message: string): Error {
  throw new Error(message)
}

type Token = {
  id: string
  contractAddress: string
}

export default class API {
  constructor(
    private readonly openseaApiKeys: { mainnet: string; rinkeby: string },
    private readonly ethProviders: { mainnet: JsonRpcProvider, rinkeby: JsonRpcProvider },
    private readonly alchemyApiKeys: { mainnet: string, rinkeby: string },
  ) {}

  private openseaApiKeyFromNetwork(network: Network): string {
    switch (network.name) {
      case 'homestead':
        return this.openseaApiKeys.mainnet
      case 'rinkeby':
        return this.openseaApiKeys.rinkeby
      default:
        throw new Error(`Unsupported network ${network.name}`)
    }
  }

  private alchemyApiKeyFromNetwork(network: Network): string {
    switch (network.name) {
      case 'homestead':
        return this.alchemyApiKeys.mainnet
      case 'rinkeby':
        return this.alchemyApiKeys.rinkeby
      default:
        throw new Error(`Unsupported network ${network.name}`)
    }
  }

  private ethProviderFromNetwork(network: Network): JsonRpcProvider {
    switch (network.name) {
      case 'homestead':
        return this.ethProviders.mainnet
      case 'rinkeby':
        return this.ethProviders.rinkeby
      default:
        throw new Error(`Unsupported network ${network.name}`)
    }
  }

  private openseaNetworkName(network: Network): OpenseaNetwork {
    switch (network.name) {
      case 'homestead':
        return OpenseaNetwork.Main
      case 'rinkeby':
        return OpenseaNetwork.Rinkeby
      default:
        throw new Error(`Unsupported network ${network.name}`)
    }
  }

  async getAsset({ token, network }: { token: Token; network: Network }): Promise<OpenSeaAsset> {
    const apiKey = this.openseaApiKeyFromNetwork(network)
    const networkName = this.openseaNetworkName(network)
    const alchemyApiKey = this.alchemyApiKeyFromNetwork(network)
    const alchemyProvider = new AlchemyProvider(network, alchemyApiKey)
    const seaport = new OpenSeaPort(alchemyProvider, { networkName, apiKey })
    return await seaport.api.getAsset({ tokenAddress: token.contractAddress, tokenId: token.id })
  }

  async createBatchTransaction({
    tokens,
    network,
    tokenRecipientAddr,
    safeAddr,
  }: {
    tokens: Token[]
    network: Network
    tokenRecipientAddr: string
    safeAddr: string
  }): Promise<SafeTransaction> {
    const openseaApiKey = this.openseaApiKeyFromNetwork(network)
    const ethProvider = this.ethProviderFromNetwork(network)
    const alchemyApiKey = this.alchemyApiKeyFromNetwork(network)
    const openseaBulkPurchaser = new OpenseaBulkPurchaser(ethProvider, { openseaApiKey, network, alchemyApiKey })
    const purchaseTxs: SinglePurchaseTx[] = []
    for (const token of tokens) {
      // TODO: rate limit
      const purchaseTx = await openseaBulkPurchaser.createSingleTokenPurchase(
        token.id,
        token.contractAddress,
        tokenRecipientAddr,
      )
      purchaseTxs.push(purchaseTx)
    }
    const metaTx = await openseaBulkPurchaser.createBatchTxFromPurchases(purchaseTxs);
    const safeTx = await openseaBulkPurchaser.safeTransactionFromMetaTransaction(metaTx, safeAddr)
    return safeTx
  }
}
