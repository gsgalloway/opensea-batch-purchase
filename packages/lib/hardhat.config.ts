import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";
import { HardhatUserConfig, SolcUserConfig } from "hardhat/types";

import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-dependency-compiler";
import "hardhat-gas-reporter";
import "@nomiclabs/hardhat-etherscan";
import "./tasks";

dotenvConfig({ path: resolve(__dirname, "./.env") });

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
  // You should disable the optimizer when debugging
  // https://hardhat.org/hardhat-network/#solidity-optimizer-support
  optimizer: {
    enabled: false,
    runs: 800,
  },
};

const compilers: SolcUserConfig[] = [{ version: "0.3.6", settings }];
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

const alchemyMainnetUrl = process.env.ALCHEMY_MAINNET_URL ?? "";

const latestBlockNumber = parseInt(
  // eslint-disable-next-line
  process.env.LATEST_BLOCK_NUMBER || "13635446"
);

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      hardfork: "london",
      gasPrice: "auto",
      chainId: chainIds.mainnet,
      forking: {
        url: alchemyMainnetUrl,
        // blockNumber: latestBlockNumber,
      },
      throwOnCallFailures: true,
      loggingEnabled: false,
    },
  },
  solidity: {
    compilers,
  },
  gasReporter: {
    currency: "USD",
    // eslint-disable-next-line
    enabled: !!process.env.REPORT_GAS,
    excludeContracts: [],
    src: "./contracts",
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
  dependencyCompiler: {
    paths: ["@gnosis.pm/safe-contracts/contracts/GnosisSafeL2.sol"],
  },
};

export default config;
