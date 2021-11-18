# OpenSea Batch Purchaser

Enables the assembly of multiple NFT purchases on OpenSea into one batch transaction using Gnosis Safe's multisend library: https://github.com/gnosis/ethers-multisend.

To use, load a new Gnosis Safe App from this project's URL at https://gsgalloway.github.io/opensea-batch-purchase-react and select the IDs and contract addresses for each token to purchase. When finished, the plugin will construct a single transaction to purchase the set, which must be approved by a threshold of Safe owners as any other transaction.
