#!/usr/bin/env sh
npx hardhat \
    --config ./node_modules/@standard-crypto/opensea-batch-purchaser/dist/hardhat.config.js \
    simulate-erc721-purchase
