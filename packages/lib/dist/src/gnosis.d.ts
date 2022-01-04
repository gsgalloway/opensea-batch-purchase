import { Networkish } from "@ethersproject/providers";
import { SafeMultisigTransactionResponse } from "@gnosis.pm/safe-service-client";
export declare function getSafeTransaction(safeTxHash: string, network?: Networkish): Promise<SafeMultisigTransactionResponse>;
