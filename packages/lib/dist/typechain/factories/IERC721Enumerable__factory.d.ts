import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IERC721Enumerable, IERC721EnumerableInterface } from "../IERC721Enumerable";
export declare class IERC721Enumerable__factory {
    static readonly abi: ({
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        constant?: undefined;
        outputs?: undefined;
        payable?: undefined;
        stateMutability?: undefined;
    } | {
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
        anonymous?: undefined;
    })[];
    static createInterface(): IERC721EnumerableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC721Enumerable;
}
