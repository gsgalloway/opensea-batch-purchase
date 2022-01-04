# OpenSea Bulk Purchaser

Library for crafting batch transactions to purchase multiple OpenSea assets from a single Gnosis Safe Transaction

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
   # Replace with your Alchemy app URL
   export ALCHEMY_MAINNET_URL=https://eth-mainnet.alchemyapi.io/v2/XXXXXXX
   yarn hardhat simulate-erc721-purchase --gnosis-safe-tx-hash $SAFE_TX_HASH --token-contract-address $TOKEN_CONTRACT_ADDRESS --token-ids "[123, 6197]"
   ```

Note that the script simulates mainnet purchases only.
