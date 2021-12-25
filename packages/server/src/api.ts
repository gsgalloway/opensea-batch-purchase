import { OpenSeaPort } from 'opensea-js'
import { Network as OpenseaNetwork, OpenSeaAsset } from 'opensea-js/lib/types'
import { Network, getNetwork } from '@ethersproject/networks'
import { JsonRpcProvider } from '@ethersproject/providers'
// import { Token } from '@standard-crypto/opensea-batch-purchaser-openapi/dist/types/model/models'
import OpenseaBulkPurchaser, { SinglePurchaseTx } from '@gsgalloway/opensea-bulk-purchaser'

function unreachable(value: never, message: string): Error {
  throw new Error(message)
}

type Token = any

export default class API {
  constructor(
    private readonly openseaApiKeys: { mainnet: string; rinkeby: string },
    private readonly ethProvider: JsonRpcProvider,
  ) {}

  private apiKeyFromNetworkName(networkName: OpenseaNetwork): string {
    switch (networkName) {
      case OpenseaNetwork.Main:
        return this.openseaApiKeys.mainnet
      case OpenseaNetwork.Rinkeby:
        return this.openseaApiKeys.rinkeby
      default:
        throw unreachable(networkName, `No such network ${networkName as string}`)
    }
  }

  private ethersNetworkFromOpensea(networkName: OpenseaNetwork): Network {
    switch (networkName) {
      case OpenseaNetwork.Main:
        return getNetwork('homestead')
      case OpenseaNetwork.Rinkeby:
        return getNetwork('rinkeby')
      default:
        throw unreachable(networkName, `No such network ${networkName as string}`)
    }
  }

  async getAsset({ token, networkName }: { token: Token; networkName: OpenseaNetwork }): Promise<OpenSeaAsset> {
    const apiKey = this.apiKeyFromNetworkName(networkName)
    const seaport = new OpenSeaPort(this.ethProvider, { networkName, apiKey })
    return await seaport.api.getAsset({ tokenAddress: token.contractAddress, tokenId: token.id })
  }

  async createBulkTransaction({
    tokens,
    networkName,
    tokenRecipientAddr,
  }: {
    tokens: Token[]
    networkName: OpenseaNetwork
    tokenRecipientAddr: string
  }): Promise<SinglePurchaseTx[]> {
    const openseaApiKey = this.apiKeyFromNetworkName(networkName)
    const network = await this.ethersNetworkFromOpensea(networkName)
    const openseaBulkPurchaser = new OpenseaBulkPurchaser(this.ethProvider, { openseaApiKey, network })
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
    return purchaseTxs
  }
}
