import { getNetwork, Networkish } from "@ethersproject/providers";
import SafeServiceClient, {
  SafeMultisigTransactionResponse,
} from "@gnosis.pm/safe-service-client";

export async function getSafeTransaction(
  safeTxHash: string,
  network: Networkish = "mainnet"
): Promise<SafeMultisigTransactionResponse> {
  const _network = await getNetwork(network);
  let safeServiceURL: string;
  switch (_network.chainId) {
    case 1: // mainnet
      safeServiceURL = "https://safe-transaction.gnosis.io";
      break;
    case 4: // rinkeby
      safeServiceURL = "https://safe-transaction.rinkeby.gnosis.io";
      break;
    default:
      throw new Error(`unsupported network ${_network.name}`);
  }

  const safeService = new SafeServiceClient(safeServiceURL);
  return await safeService.getTransaction(safeTxHash);
}
