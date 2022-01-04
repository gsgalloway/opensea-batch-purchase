import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { BigNumberish } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
export declare function asAccount<T>(hre: HardhatRuntimeEnvironment, address: string, action: (signer: SignerWithAddress) => Promise<T>): Promise<T>;
export declare function setAccountBalance(hre: HardhatRuntimeEnvironment, account: string, balanceWei: BigNumberish): Promise<void>;
