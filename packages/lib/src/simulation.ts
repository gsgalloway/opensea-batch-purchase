import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { BigNumber, BigNumberish } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export async function asAccount<T>(
  hre: HardhatRuntimeEnvironment,
  address: string,
  action: (signer: SignerWithAddress) => Promise<T>
): Promise<T> {
  const { network, ethers } = hre;
  await network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [address],
  });
  const signer = await ethers.getSigner(address);
  const result = await action(signer);
  await network.provider.request({
    method: "hardhat_stopImpersonatingAccount",
    params: [address],
  });
  return result;
}

export async function setAccountBalance(
  hre: HardhatRuntimeEnvironment,
  account: string,
  balanceWei: BigNumberish
): Promise<void> {
  await hre.ethers.provider.send("hardhat_setBalance", [
    account,
    BigNumber.from(balanceWei).toHexString(),
  ]);
}
