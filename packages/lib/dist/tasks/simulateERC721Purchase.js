"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const simulation_1 = require("../src/simulation");
const gnosis_1 = require("../src/gnosis");
const utils_1 = require("ethers/lib/utils");
const safe_contracts_1 = require("@gnosis.pm/safe-contracts");
(0, config_1.task)('simulate-erc721-purchase')
    .setDescription('Given a Gnosis Safe Transaction and a list of expected NFT purchases, ' +
    'validates that the transaction succeeds on a current mainnet fork and ' +
    'that the expected NFTs are purchased.')
    .addParam('gnosisSafeTxHash', 'The Gnosis Safe Transaction hash', undefined /* default */, config_1.types.string, false /* isOptional */)
    .addParam('tokenContractAddress', 'The address of the ERC721 contract governing the tokens purchased', undefined /* default */, config_1.types.string, false /* isOptional */)
    .addParam('tokenIds', 'Token IDs that should be purchased by this transaction. Ex: ["123", "6198"]', undefined /* default */, config_1.types.json, false /* isOptional */)
    .setAction(async ({ gnosisSafeTxHash, tokenContractAddress, tokenIds: tokenIDs }, hre) => {
    var _a, _b;
    const { ethers } = hre;
    console.log('Waiting for connection to Alchemy...');
    await ethers.provider.ready;
    const startingBlockNumber = await ethers.provider.getBlockNumber();
    console.log(`Simulating as of block ${startingBlockNumber}...`);
    const safeTx = await (0, gnosis_1.getSafeTransaction)(gnosisSafeTxHash);
    const typedSafeTx = {
        ...safeTx,
        refundReceiver: (_a = safeTx.refundReceiver) !== null && _a !== void 0 ? _a : '',
        data: (_b = safeTx.data) !== null && _b !== void 0 ? _b : '',
    };
    const signatures = await simulateApprovals(hre, safeTx.safe, typedSafeTx);
    await simulateExecution(hre, safeTx.safe, typedSafeTx, signatures);
    await checkOwnershipOfTokens(hre, safeTx.safe, tokenContractAddress, tokenIDs);
    console.log('Success!');
});
const simulateApprovals = async (hre, safeAddr, safeTx) => {
    const { ethers } = hre;
    const gnosisSafe = await ethers.getContractAt('GnosisSafe', safeAddr);
    const safeOwners = await gnosisSafe.getOwners();
    const signatures = [];
    for (const safeOwner of safeOwners) {
        await (0, simulation_1.setAccountBalance)(hre, safeOwner, (0, utils_1.parseEther)('1000'));
        await (0, simulation_1.asAccount)(hre, safeOwner, async (signer) => {
            const signature = await (0, safe_contracts_1.safeApproveHash)(signer, gnosisSafe, safeTx, false);
            signatures.push(signature);
        });
        console.log(`Simulated approval from owner ${safeOwner}`);
    }
    return signatures;
};
const simulateExecution = async (hre, safeAddr, safeTx, signatures) => {
    const { ethers } = hre;
    const gnosisSafe = await ethers.getContractAt('GnosisSafe', safeAddr);
    const safeOwners = await gnosisSafe.getOwners();
    await (0, simulation_1.asAccount)(hre, safeOwners[0], async (signer) => {
        console.log(`Simulating execution of transaction from account ${await signer.getAddress()}...`);
        await (0, safe_contracts_1.executeTx)(gnosisSafe.connect(signer), safeTx, signatures);
        console.log(`Transaction success.`);
    });
};
const checkOwnershipOfTokens = async (hre, safeAddr, tokenContractAddress, tokenIDs) => {
    const { ethers } = hre;
    const artBlocks = await ethers.getContractAt('ERC721', tokenContractAddress);
    for (const tokenID of tokenIDs) {
        const newOwner = await artBlocks.ownerOf(tokenID);
        if (newOwner !== safeAddr) {
            throw new Error(`Safe at ${safeAddr} would not own token ${tokenID}`);
        }
        console.log(`Confirmed safe would own token ${tokenID}`);
    }
};
