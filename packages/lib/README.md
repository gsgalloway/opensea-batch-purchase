# OpenSea Bulk Purchaser

Library for crafting batch transactions to purchase multiple OpenSea assets from a single Gnosis Safe Transaction

## Simulating a Transaction Before Execution

To verify that a batch transaction will succeed when executed, use the following:

1. Fetch the SafeTransactionHash from the Gnosis UI
1. Run `yarn hardhat simulate-artblocks-purchase --gnosis-safe-tx-hash $SAFE_TX_HASH --token-ids "[123, 6197]"`
