import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { Guard, GuardInterface } from "../Guard";
export declare class Guard__factory {
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): GuardInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Guard;
}
