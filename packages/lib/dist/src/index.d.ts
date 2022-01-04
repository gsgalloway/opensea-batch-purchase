import { Provider, Networkish } from '@ethersproject/providers';
import { BigNumber, BigNumberish } from 'ethers';
import { MetaTransaction } from 'ethers-multisend';
import { SafeTransaction } from '@gnosis.pm/safe-contracts';
export interface SinglePurchaseTx {
    to: string;
    data: string;
    value: BigNumber;
}
export interface OpenseaBulkPurchaserConfig {
    alchemyApiKey?: string;
    openseaApiKey?: string;
    network?: Networkish;
}
export default class OpenseaBulkPurchaser {
    private readonly seaport;
    private readonly wyvernExchange;
    private readonly provider;
    constructor(provider: Provider, config?: OpenseaBulkPurchaserConfig);
    createSingleTokenPurchase: (tokenId: BigNumberish, assetContractAddress: string, tokenRecipientAddress: string) => Promise<SinglePurchaseTx>;
    createBatchTxFromPurchases: (individualPurchases: SinglePurchaseTx[]) => Promise<MetaTransaction>;
    safeTransactionFromMetaTransaction: (metaTransaction: MetaTransaction, safeAddressOrSafeNonce: string | number) => Promise<SafeTransaction>;
    private readonly _fetchCheapestSellOrderForToken;
    private readonly _fixBuyOrderListingDate;
}
