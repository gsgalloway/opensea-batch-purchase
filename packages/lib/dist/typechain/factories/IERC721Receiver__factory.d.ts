import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IERC721Receiver, IERC721ReceiverInterface } from "../IERC721Receiver";
export declare class IERC721Receiver__factory {
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
    static createInterface(): IERC721ReceiverInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC721Receiver;
}
