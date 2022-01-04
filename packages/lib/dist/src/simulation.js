"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAccountBalance = exports.asAccount = void 0;
const ethers_1 = require("ethers");
async function asAccount(hre, address, action) {
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
exports.asAccount = asAccount;
async function setAccountBalance(hre, account, balanceWei) {
    await hre.ethers.provider.send("hardhat_setBalance", [
        account,
        ethers_1.BigNumber.from(balanceWei).toHexString(),
    ]);
}
exports.setAccountBalance = setAccountBalance;
