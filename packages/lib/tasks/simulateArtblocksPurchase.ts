import { task, types } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { asAccount, setAccountBalance } from "../src/simulation";
import { getSafeTransaction } from "../src/gnosis";
import { parseEther } from "ethers/lib/utils";
import {
  executeTx,
  safeApproveHash,
  SafeSignature,
  SafeTransaction,
} from "@gnosis.pm/safe-contracts";

interface args {
  gnosisSafeTxHash: string;
  tokenIds: Array<string | number>;
}

const artblocksContractAddress = "0x059edd72cd353df5106d2b9cc5ab83a52287ac3a";

task("simulate-artblocks-purchase")
  .setDescription(
    "Given a Gnosis Safe Transaction and a list of expected NFT purchases, " +
      "validates that the transaction succeeds on a current mainnet fork and " +
      "that the expected NFTs are purchased."
  )
  .addParam(
    "gnosisSafeTxHash",
    "The Gnosis Safe Transaction hash",
    undefined /* default */,
    types.string,
    false /* isOptional */
  )
  .addParam(
    "tokenIds",
    'Token IDs that should be purchased by this transaction. Ex: ["123", "6198"]',
    undefined /* default */,
    types.json,
    false /* isOptional */
  )
  .setAction(async ({ gnosisSafeTxHash, tokenIds: tokenIDs }: args, hre) => {
    const { ethers } = hre;
    const startingBlockNumber = await ethers.provider.getBlockNumber();
    console.log(`Simulating as of block ${startingBlockNumber}...`);

    const safeTx = await getSafeTransaction(gnosisSafeTxHash);
    const typedSafeTx: SafeTransaction = {
      ...safeTx,
      refundReceiver: safeTx.refundReceiver ?? "",
      data: safeTx.data ?? "",
    };

    const signatures = await simulateApprovals(hre, safeTx.safe, typedSafeTx);
    await simulateExecution(hre, safeTx.safe, typedSafeTx, signatures);
    await checkOwnershipOfTokens(hre, safeTx.safe, tokenIDs);

    console.log("Success!");
  });

const simulateApprovals = async (
  hre: HardhatRuntimeEnvironment,
  safeAddr: string,
  safeTx: SafeTransaction
): Promise<SafeSignature[]> => {
  const { ethers } = hre;
  const gnosisSafe = await ethers.getContractAt("GnosisSafe", safeAddr);
  const safeOwners = await gnosisSafe.getOwners();
  const signatures: SafeSignature[] = [];
  for (const safeOwner of safeOwners) {
    await setAccountBalance(hre, safeOwner, parseEther("1000"));
    await asAccount(hre, safeOwner, async (signer) => {
      const signature = await safeApproveHash(
        signer,
        gnosisSafe,
        safeTx,
        false
      );
      signatures.push(signature);
    });
    console.log(`Simulated approval from owner ${safeOwner as string}`);
  }
  return signatures;
};

const simulateExecution = async (
  hre: HardhatRuntimeEnvironment,
  safeAddr: string,
  safeTx: SafeTransaction,
  signatures: SafeSignature[]
): Promise<void> => {
  const { ethers } = hre;
  const gnosisSafe = await ethers.getContractAt("GnosisSafe", safeAddr);
  const safeOwners = await gnosisSafe.getOwners();
  await asAccount(hre, safeOwners[0], async (signer) => {
    console.log(
      `Simulating execution of transaction from account ${await signer.getAddress()}...`
    );
    await executeTx(gnosisSafe.connect(signer), safeTx, signatures);
    console.log(`Transaction success.`);
  });
};

const checkOwnershipOfTokens = async (
  hre: HardhatRuntimeEnvironment,
  safeAddr: string,
  tokenIDs: Array<string | number>
): Promise<void> => {
  const { ethers } = hre;
  const artBlocks = await ethers.getContractAt(
    "GenArt721",
    artblocksContractAddress
  );
  for (const tokenID of tokenIDs) {
    const newOwner = await artBlocks.ownerOf(tokenID);
    if (newOwner !== safeAddr) {
      throw new Error(`Safe at ${safeAddr} would not own token ${tokenID}`);
    }
    console.log(`Confirmed safe would own artblocks token ${tokenID}`);
  }
};
