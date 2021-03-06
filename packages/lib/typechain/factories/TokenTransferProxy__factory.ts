/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  TokenTransferProxy,
  TokenTransferProxyInterface,
} from "../TokenTransferProxy";

const _abi = [
  {
    constant: false,
    inputs: [
      {
        name: "token",
        type: "address",
      },
      {
        name: "from",
        type: "address",
      },
      {
        name: "to",
        type: "address",
      },
      {
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "registry",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506103be806100206000396000f30060806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806315dacbea146100515780637b103999146100f6575b600080fd5b34801561005d57600080fd5b506100dc600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061014d565b604051808215151515815260200191505060405180910390f35b34801561010257600080fd5b5061010b61036d565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166369dc9ff3336040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b15801561020b57600080fd5b505af115801561021f573d6000803e3d6000fd5b505050506040513d602081101561023557600080fd5b8101908080519060200190929190505050151561025157600080fd5b8473ffffffffffffffffffffffffffffffffffffffff166323b872dd8585856040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b15801561032857600080fd5b505af115801561033c573d6000803e3d6000fd5b505050506040513d602081101561035257600080fd5b81019080805190602001909291905050509050949350505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16815600a165627a7a72305820cdced764a91cd2887ecdde000181ca1a44e9027e92b2854fc5349d6789bceda10029";

export class TokenTransferProxy__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TokenTransferProxy> {
    return super.deploy(overrides || {}) as Promise<TokenTransferProxy>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TokenTransferProxy {
    return super.attach(address) as TokenTransferProxy;
  }
  connect(signer: Signer): TokenTransferProxy__factory {
    return super.connect(signer) as TokenTransferProxy__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TokenTransferProxyInterface {
    return new utils.Interface(_abi) as TokenTransferProxyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TokenTransferProxy {
    return new Contract(address, _abi, signerOrProvider) as TokenTransferProxy;
  }
}
