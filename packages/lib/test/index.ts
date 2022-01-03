import hre, { ethers } from "hardhat";
import { solidity } from "ethereum-waffle";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import chaiString from "chai-string";
import OpenseaBulkPurchaser from "../src";
import { expectDefined } from "./utils";
import { asAccount, setAccountBalance } from "../src/simulation";
import { parseEther } from "@ethersproject/units";
import {
  executeTx,
  SafeSignature,
  safeApproveHash,
  SafeTransaction,
} from "@gnosis.pm/safe-contracts";
import { GenArt721, GnosisSafe } from "../typechain";
import { BigNumber } from "@ethersproject/bignumber";

chai.use(solidity);
chai.use(chaiString);
chai.use(chaiAsPromised);
const { expect } = chai;

const GNOSIS_SAFE_ADDRESS = process.env.GNOSIS_SAFE_ADDRESS;
const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY;

const artblocksContractAddress = "0x059edd72cd353df5106d2b9cc5ab83a52287ac3a";

describe("BulkPurchaser", function () {
  let gnosisSafe: GnosisSafe;
  let artBlocks: GenArt721;
  let safeOwners: string[] = [];
  let totalCost = BigNumber.from(0);
  let batchPurchase: SafeTransaction;

  expectDefined(GNOSIS_SAFE_ADDRESS);
  expectDefined(OPENSEA_API_KEY);

  const bulkPurchaser = new OpenseaBulkPurchaser(ethers.provider, {
    openseaApiKey: OPENSEA_API_KEY,
  });
  const targetArtblocksIDs = [8332, 1365];

  before("setup contracts", async function () {
    gnosisSafe = await ethers.getContractAt("GnosisSafe", GNOSIS_SAFE_ADDRESS);
    artBlocks = await ethers.getContractAt(
      "GenArt721",
      artblocksContractAddress
    );
    safeOwners = await gnosisSafe.getOwners();
  });

  before(
    "fund a bunch of ETH into the gnosis safe and its owners",
    async function () {
      for (const addrToFund of [GNOSIS_SAFE_ADDRESS, ...safeOwners]) {
        await setAccountBalance(hre, addrToFund, parseEther("1000"));
      }
    }
  );

  it("should be able to create a batch Gnosis transaction for multiple orders", async function () {
    const individualPurchases = await Promise.all(
      targetArtblocksIDs.map(async (tokenID) => {
        const purchaseTx = await bulkPurchaser.createSingleTokenPurchase(
          tokenID,
          artblocksContractAddress,
          GNOSIS_SAFE_ADDRESS
        );
        totalCost = totalCost.add(purchaseTx.value);
        return purchaseTx;
      })
    );
    batchPurchase = await bulkPurchaser.safeTransactionFromMetaTransaction(
      await bulkPurchaser.createBatchTxFromPurchases(
        individualPurchases,
      ),
      GNOSIS_SAFE_ADDRESS
    );
  });

  it("sign and execute gnosis transaction", async function () {
    const ownerSignatures: SafeSignature[] = [];
    for (const safeOwner of safeOwners) {
      await asAccount(hre, safeOwner, async (signer) => {
        const signature = await safeApproveHash(
          signer,
          gnosisSafe,
          batchPurchase,
          false
        );
        ownerSignatures.push(signature);
      });
    }
    await asAccount(hre, safeOwners[0], async (signer) => {
      await executeTx(
        gnosisSafe.connect(signer),
        batchPurchase,
        ownerSignatures
      );
    });
  });

  it("gnosis safe should now own all the target tokens", async function () {
    for (const squiggleID of targetArtblocksIDs) {
      const newOwner = await artBlocks.ownerOf(squiggleID);
      expect(newOwner).to.equal(GNOSIS_SAFE_ADDRESS);
    }
  });

  it("gnosis safe's new balance should reflect exactly the purchase price of all the tokens", async function () {
    const finalBalanceOfSafe = await ethers.provider.getBalance(
      GNOSIS_SAFE_ADDRESS
    );
    const expectedFinalBalance = parseEther("1000").sub(totalCost);
    expect(finalBalanceOfSafe).to.equal(expectedFinalBalance);
  });

  it.only("DELETE ME", async function() {
    await bulkPurchaser.createSingleTokenPurchase("6970", "0x059edd72cd353df5106d2b9cc5ab83a52287ac3a", "0x059edd72cd353df5106d2b9cc5ab83a52287ac3a")
  })
});
