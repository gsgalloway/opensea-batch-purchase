# OpenSea Bulk Purchaser

Library for crafting batch transactions to purchase multiple OpenSea assets from a single Gnosis Safe Transaction

## Installation

```sh
npm install @standard-crypto/opensea-batch-purchaser
```

## Simulating a Transaction Before Execution

An invocation of OpenSea's [public function for fulfilling an order](https://etherscan.io/address/0x7be8076f4ea4a4ad08075c2508e481d6c946d12b#code#L1363) is
difficult to understand at a glance. This tool allows for simulating a transaction to confirm both that it can be executed without failure, and that it
correctly purchases the intended assets.

To verify that a batch transaction will succeed when executed, use the following:

1. Fetch the SafeTransactionHash from the Gnosis UI. (Note this is separate from an Ethereum transaction hash)
1. Fetch the contract address and token IDs of the tokens you expect to be purchased in this transaction
1. Find or create an [Alchemy](https://www.alchemy.com/) app for Ethereum mainnet and grab its API key
1. Run

   ```sh
   # hardhat peer dependencies required for simulating transactions locally
   npm install \
      hardhat \
      @nomiclabs/hardhat-ethers \
      @standard-crypto/opensea-batch-purchaser

   # Replace with your Alchemy app URL
   export ALCHEMY_MAINNET_URL=https://eth-mainnet.alchemyapi.io/v2/XXXXXXX
   export SAFE_TX_HASH=...
   export TOKEN_CONTRACT_ADDRESS=...

   npx simulate-erc721-purchase \
      --gnosis-safe-tx-hash $SAFE_TX_HASH \
      --token-contract-address $TOKEN_CONTRACT_ADDRESS \
      --token-ids "[123, 6197]"
   ```

Note that the script simulates mainnet purchases only, where the asset being purchased is registered as part of an ERC721 token contract.

## For Developers

Example usage:

```typescript
import OpenseaBulkPurchaser, { SinglePurchaseTx } from '@standard-crypto/opensea-batch-purchaser'
import { InfuraProvider } from '@ethersproject/providers'

const openseaBulkPurchaser = new OpenseaBulkPurchaser(new InfuraProvider(), { openseaApiKey, 'homestead', alchemyApiKey })
const purchaseTxs: SinglePurchaseTx[] = []
for (const token of tokens) {
  const purchaseTx = await openseaBulkPurchaser.createSingleTokenPurchase(
    token.id,
    token.contractAddress,
    tokenRecipientAddr,
  )
  purchaseTxs.push(purchaseTx)
}
const metaTx = await openseaBulkPurchaser.createBatchTxFromPurchases(purchaseTxs)
const safeTransaction = await openseaBulkPurchaser.safeTransactionFromMetaTransaction(metaTx, safeAddress)
```

There are several ways you can use the resultant Safe Transaction. See https://github.com/gnosis/ethers-multisend#what-to-do-with-the-encoded-transaction-objects for details.
