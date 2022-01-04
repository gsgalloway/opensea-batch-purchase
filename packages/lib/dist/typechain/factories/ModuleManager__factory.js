"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleManager__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "module",
                type: "address",
            },
        ],
        name: "DisabledModule",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "module",
                type: "address",
            },
        ],
        name: "EnabledModule",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "module",
                type: "address",
            },
        ],
        name: "ExecutionFromModuleFailure",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "module",
                type: "address",
            },
        ],
        name: "ExecutionFromModuleSuccess",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "prevModule",
                type: "address",
            },
            {
                internalType: "address",
                name: "module",
                type: "address",
            },
        ],
        name: "disableModule",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "module",
                type: "address",
            },
        ],
        name: "enableModule",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
            {
                internalType: "enum Enum.Operation",
                name: "operation",
                type: "uint8",
            },
        ],
        name: "execTransactionFromModule",
        outputs: [
            {
                internalType: "bool",
                name: "success",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
            {
                internalType: "enum Enum.Operation",
                name: "operation",
                type: "uint8",
            },
        ],
        name: "execTransactionFromModuleReturnData",
        outputs: [
            {
                internalType: "bool",
                name: "success",
                type: "bool",
            },
            {
                internalType: "bytes",
                name: "returnData",
                type: "bytes",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "start",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "pageSize",
                type: "uint256",
            },
        ],
        name: "getModulesPaginated",
        outputs: [
            {
                internalType: "address[]",
                name: "array",
                type: "address[]",
            },
            {
                internalType: "address",
                name: "next",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "module",
                type: "address",
            },
        ],
        name: "isModuleEnabled",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode = "0x608060405234801561001057600080fd5b50611598806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c8063610b592511610050578063610b592514610108578063cc2f845214610124578063e009cfde1461015557610072565b80632d9ad53d14610077578063468721a7146100a75780635229073f146100d7575b600080fd5b610091600480360381019061008c9190610d88565b610171565b60405161009e9190610dd0565b60405180910390f35b6100c160048036038101906100bc9190610f8c565b610242565b6040516100ce9190610dd0565b60405180910390f35b6100f160048036038101906100ec9190610f8c565b6103f4565b6040516100ff929190611097565b60405180910390f35b610122600480360381019061011d9190610d88565b61042a565b005b61013e600480360381019061013991906110c7565b61073c565b60405161014c9291906111d4565b60405180910390f35b61016f600480360381019061016a9190611204565b61093b565b005b60008173ffffffffffffffffffffffffffffffffffffffff16600173ffffffffffffffffffffffffffffffffffffffff161415801561023b5750600073ffffffffffffffffffffffffffffffffffffffff166000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614155b9050919050565b6000600173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415801561030c5750600073ffffffffffffffffffffffffffffffffffffffff166000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614155b61034b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610342906112a1565b60405180910390fd5b610358858585855a610c4c565b905080156103a8573373ffffffffffffffffffffffffffffffffffffffff167f6895c13664aa4f67288b25d7a21d7aaa34916e355fb9b6fae0a139a9085becb860405160405180910390a26103ec565b3373ffffffffffffffffffffffffffffffffffffffff167facd2c8702804128fdb0db2bb49f6d127dd0181c13fd45dbfe16de0930e2bd37560405160405180910390a25b949350505050565b6000606061040486868686610242565b915060405160203d0181016040523d81523d6000602083013e8091505094509492505050565b610432610ca6565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415801561049c5750600173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614155b6104db576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104d29061130d565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff166000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146105a8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161059f90611379565b60405180910390fd5b600080600173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600080600173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507fecdf3a3effea5783a3c4c2140e677577666428d44ed9d474a0b3a4c9943f8440816040516107319190611399565b60405180910390a150565b606060008267ffffffffffffffff81111561075a57610759610e3c565b5b6040519080825280602002602001820160405280156107885781602001602082028036833780820191505090505b5091506000808060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415801561085a5750600173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614155b801561086557508482105b1561092c578084838151811061087e5761087d6113b4565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250506000808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050818061092490611412565b9250506107f0565b80925081845250509250929050565b610943610ca6565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141580156109ad5750600173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614155b6109ec576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109e39061130d565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff166000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610ab8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610aaf906114a7565b60405180910390fd5b6000808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507faab4fa2b463f581b2b32cb3b7e3b704b9ce37cc209b5fb4d77e593ace405427681604051610c409190611399565b60405180910390a15050565b6000600180811115610c6157610c606114c7565b5b836001811115610c7457610c736114c7565b5b1415610c8d576000808551602087018986f49050610c9d565b600080855160208701888a87f190505b95945050505050565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610d14576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d0b90611542565b60405180910390fd5b565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610d5582610d2a565b9050919050565b610d6581610d4a565b8114610d7057600080fd5b50565b600081359050610d8281610d5c565b92915050565b600060208284031215610d9e57610d9d610d20565b5b6000610dac84828501610d73565b91505092915050565b60008115159050919050565b610dca81610db5565b82525050565b6000602082019050610de56000830184610dc1565b92915050565b6000819050919050565b610dfe81610deb565b8114610e0957600080fd5b50565b600081359050610e1b81610df5565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610e7482610e2b565b810181811067ffffffffffffffff82111715610e9357610e92610e3c565b5b80604052505050565b6000610ea6610d16565b9050610eb28282610e6b565b919050565b600067ffffffffffffffff821115610ed257610ed1610e3c565b5b610edb82610e2b565b9050602081019050919050565b82818337600083830152505050565b6000610f0a610f0584610eb7565b610e9c565b905082815260208101848484011115610f2657610f25610e26565b5b610f31848285610ee8565b509392505050565b600082601f830112610f4e57610f4d610e21565b5b8135610f5e848260208601610ef7565b91505092915050565b60028110610f7457600080fd5b50565b600081359050610f8681610f67565b92915050565b60008060008060808587031215610fa657610fa5610d20565b5b6000610fb487828801610d73565b9450506020610fc587828801610e0c565b935050604085013567ffffffffffffffff811115610fe657610fe5610d25565b5b610ff287828801610f39565b925050606061100387828801610f77565b91505092959194509250565b600081519050919050565b600082825260208201905092915050565b60005b8381101561104957808201518184015260208101905061102e565b83811115611058576000848401525b50505050565b60006110698261100f565b611073818561101a565b935061108381856020860161102b565b61108c81610e2b565b840191505092915050565b60006040820190506110ac6000830185610dc1565b81810360208301526110be818461105e565b90509392505050565b600080604083850312156110de576110dd610d20565b5b60006110ec85828601610d73565b92505060206110fd85828601610e0c565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b61113c81610d4a565b82525050565b600061114e8383611133565b60208301905092915050565b6000602082019050919050565b600061117282611107565b61117c8185611112565b935061118783611123565b8060005b838110156111b857815161119f8882611142565b97506111aa8361115a565b92505060018101905061118b565b5085935050505092915050565b6111ce81610d4a565b82525050565b600060408201905081810360008301526111ee8185611167565b90506111fd60208301846111c5565b9392505050565b6000806040838503121561121b5761121a610d20565b5b600061122985828601610d73565b925050602061123a85828601610d73565b9150509250929050565b600082825260208201905092915050565b7f4753313034000000000000000000000000000000000000000000000000000000600082015250565b600061128b600583611244565b915061129682611255565b602082019050919050565b600060208201905081810360008301526112ba8161127e565b9050919050565b7f4753313031000000000000000000000000000000000000000000000000000000600082015250565b60006112f7600583611244565b9150611302826112c1565b602082019050919050565b60006020820190508181036000830152611326816112ea565b9050919050565b7f4753313032000000000000000000000000000000000000000000000000000000600082015250565b6000611363600583611244565b915061136e8261132d565b602082019050919050565b6000602082019050818103600083015261139281611356565b9050919050565b60006020820190506113ae60008301846111c5565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061141d82610deb565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156114505761144f6113e3565b5b600182019050919050565b7f4753313033000000000000000000000000000000000000000000000000000000600082015250565b6000611491600583611244565b915061149c8261145b565b602082019050919050565b600060208201905081810360008301526114c081611484565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4753303331000000000000000000000000000000000000000000000000000000600082015250565b600061152c600583611244565b9150611537826114f6565b602082019050919050565b6000602082019050818103600083015261155b8161151f565b905091905056fea264697066735822122045d181a38c986da6dd367eef239a4a26700e4d447f1e26555608079f8d6d5ff764736f6c634300080a0033";
class ModuleManager__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (args.length === 1) {
            super(_abi, _bytecode, args[0]);
        }
        else {
            super(...args);
        }
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.ModuleManager__factory = ModuleManager__factory;
ModuleManager__factory.bytecode = _bytecode;
ModuleManager__factory.abi = _abi;