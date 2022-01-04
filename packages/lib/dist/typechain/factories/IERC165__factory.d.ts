import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IERC165, IERC165Interface } from "../IERC165";
export declare class IERC165__factory {
    static readonly abi: {
        constant: boolean;
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IERC165Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC165;
}
