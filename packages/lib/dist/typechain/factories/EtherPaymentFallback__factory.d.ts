import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { EtherPaymentFallback, EtherPaymentFallbackInterface } from "../EtherPaymentFallback";
export declare class EtherPaymentFallback__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<EtherPaymentFallback>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): EtherPaymentFallback;
    connect(signer: Signer): EtherPaymentFallback__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5060c18061001f6000396000f3fe6080604052366056573373ffffffffffffffffffffffffffffffffffffffff167f3d0ce9bfc3ed7d6862dbb28b2dea94561fe714a1b4d019aa8af39730d1ad7c3d34604051604c91906072565b60405180910390a2005b600080fd5b6000819050919050565b606c81605b565b82525050565b6000602082019050608560008301846065565b9291505056fea2646970667358221220e3f44804914ffad2f85531e35bd08207942efe0097d6ebd3a8243bf28179272e64736f6c634300080a0033";
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
        stateMutability?: undefined;
    } | {
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        inputs?: undefined;
        name?: undefined;
    })[];
    static createInterface(): EtherPaymentFallbackInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): EtherPaymentFallback;
}
