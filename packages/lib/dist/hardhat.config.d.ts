import { HardhatUserConfig } from "hardhat/types";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-dependency-compiler";
import "hardhat-gas-reporter";
import "@nomiclabs/hardhat-etherscan";
import "./tasks";
declare const config: HardhatUserConfig;
export default config;