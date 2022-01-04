import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { OwnedUpgradeabilityStorage, OwnedUpgradeabilityStorageInterface } from "../OwnedUpgradeabilityStorage";
export declare class OwnedUpgradeabilityStorage__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<OwnedUpgradeabilityStorage>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): OwnedUpgradeabilityStorage;
    connect(signer: Signer): OwnedUpgradeabilityStorage__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b506101bd806100206000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680634555d5c91461005c5780635c60da1b146100875780636fde8202146100de575b600080fd5b34801561006857600080fd5b50610071610135565b6040518082815260200191505060405180910390f35b34801561009357600080fd5b5061009c61013e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156100ea57600080fd5b506100f3610167565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60006002905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050905600a165627a7a723058202ea50517f9d479dc79fd33718f7ed4b523c7841aa071a02eb2d097a4228429c10029";
    static readonly abi: {
        constant: boolean;
        inputs: never[];
        name: string;
        outputs: {
            name: string;
            type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): OwnedUpgradeabilityStorageInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): OwnedUpgradeabilityStorage;
}
