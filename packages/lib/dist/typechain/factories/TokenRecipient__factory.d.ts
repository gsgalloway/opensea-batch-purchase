import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TokenRecipient, TokenRecipientInterface } from "../TokenRecipient";
export declare class TokenRecipient__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<TokenRecipient>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): TokenRecipient;
    connect(signer: Signer): TokenRecipient__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5061036b806100206000396000f300608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680638f4ffcb114610091575b3373ffffffffffffffffffffffffffffffffffffffff167fa419615bc8fda4c87663805ee2a3597a6d71c1d476911d9892f340d965bc7bf1346040518082815260200191505060405180910390a2005b34801561009d57600080fd5b50610142600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610144565b005b60008290508073ffffffffffffffffffffffffffffffffffffffff166323b872dd8630876040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b15801561022057600080fd5b505af1158015610234573d6000803e3d6000fd5b505050506040513d602081101561024a57600080fd5b8101908080519060200190929190505050151561026657600080fd5b8273ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fd65b48fd35864b3528d38e44760be5553248f89bf3ff6b06cca57817cc2650bf86856040518083815260200180602001828103825283818151815260200191508051906020019080838360005b838110156102fd5780820151818401526020810190506102e2565b50505050905090810190601f16801561032a5780820380516001836020036101000a031916815260200191505b50935050505060405180910390a350505050505600a165627a7a72305820b9fa3263006d495ed0bd98ca82bf4461696b6dbadd55385e680affde2283278c0029";
    static readonly abi: ({
        constant: boolean;
        inputs: {
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        payable: boolean;
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    } | {
        payable: boolean;
        stateMutability: string;
        type: string;
        constant?: undefined;
        inputs?: undefined;
        name?: undefined;
        outputs?: undefined;
        anonymous?: undefined;
    } | {
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        constant?: undefined;
        outputs?: undefined;
        payable?: undefined;
        stateMutability?: undefined;
    })[];
    static createInterface(): TokenRecipientInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): TokenRecipient;
}
