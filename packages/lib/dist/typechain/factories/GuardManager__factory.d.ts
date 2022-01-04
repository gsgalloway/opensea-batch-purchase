import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { GuardManager, GuardManagerInterface } from "../GuardManager";
export declare class GuardManager__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<GuardManager>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): GuardManager;
    connect(signer: Signer): GuardManager__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50610297806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063e19a9dd914610030575b600080fd5b61004a6004803603810190610045919061018d565b61004c565b005b6100546100ba565b60007f4a204f620c8c5ccdca3fd54d003badd85ba500436a431f0cbda4f558c93c34c860001b90508181557f1151116914515bc0891ff9047a6cb32cf902546f83066499bcf8ba33d2353fa2826040516100ae91906101c9565b60405180910390a15050565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610128576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161011f90610241565b60405180910390fd5b565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061015a8261012f565b9050919050565b61016a8161014f565b811461017557600080fd5b50565b60008135905061018781610161565b92915050565b6000602082840312156101a3576101a261012a565b5b60006101b184828501610178565b91505092915050565b6101c38161014f565b82525050565b60006020820190506101de60008301846101ba565b92915050565b600082825260208201905092915050565b7f4753303331000000000000000000000000000000000000000000000000000000600082015250565b600061022b6005836101e4565b9150610236826101f5565b602082019050919050565b6000602082019050818103600083015261025a8161021e565b905091905056fea264697066735822122077e2eca176750c31d6d234331d630cea51e034813fe21a064b14665e662ebc4464736f6c634300080a0033";
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
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): GuardManagerInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): GuardManager;
}
