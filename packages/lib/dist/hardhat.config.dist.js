"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomiclabs/hardhat-ethers");
require("./tasks");
const chainIds = {
    ganache: 1337,
    goerli: 5,
    hardhat: 31337,
    kovan: 42,
    mainnet: 1,
    rinkeby: 4,
    ropsten: 3,
};
const settings = {
    optimizer: {
        enabled: false,
        runs: 800,
    },
};
const compilers = [{ version: '0.3.6', settings }];
for (let v4 = 0; v4 < 27; v4++) {
    compilers.push({ version: `0.4.${v4}`, settings });
}
for (let v5 = 0; v5 < 17; v5++) {
    compilers.push({ version: `0.5.${v5}`, settings });
}
for (let v6 = 0; v6 < 13; v6++) {
    compilers.push({ version: `0.6.${v6}`, settings });
}
for (let v7 = 0; v7 < 7; v7++) {
    compilers.push({ version: `0.7.${v7}`, settings });
}
for (let v8 = 0; v8 < 11; v8++) {
    compilers.push({ version: `0.8.${v8}`, settings });
}
const alchemyMainnetUrl = (_a = process.env.ALCHEMY_MAINNET_URL) !== null && _a !== void 0 ? _a : '';
if (alchemyMainnetUrl === '') {
    console.warn('No value for env var ALCHEMY_MAINNET_URL set!');
}
const config = {
    defaultNetwork: 'hardhat',
    networks: {
        hardhat: {
            hardfork: 'london',
            gasPrice: 'auto',
            chainId: chainIds.mainnet,
            forking: {
                url: alchemyMainnetUrl,
            },
            throwOnCallFailures: true,
            loggingEnabled: false,
        },
    },
    solidity: {
        compilers,
    },
};
exports.default = config;
