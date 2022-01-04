import { Signer, BytesLike, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ERC721ReceiverMock, ERC721ReceiverMockInterface } from "../ERC721ReceiverMock";
export declare class ERC721ReceiverMock__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(retval: BytesLike, reverts: boolean, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ERC721ReceiverMock>;
    getDeployTransaction(retval: BytesLike, reverts: boolean, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): ERC721ReceiverMock;
    connect(signer: Signer): ERC721ReceiverMock__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b506040516104033803806104038339818101604052604081101561003357600080fd5b810190808051906020019092919080519060200190929190505050816000806101000a81548163ffffffff021916908360e01c021790555080600060046101000a81548160ff021916908315150217905550505061036d806100966000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063150b7a0214610030575b600080fd5b6101336004803603608081101561004657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803590602001906401000000008111156100ad57600080fd5b8201836020820111156100bf57600080fd5b803590602001918460018302840111640100000000831117156100e157600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610187565b60405180827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390f35b60008060049054906101000a900460ff161561020b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f45524337323152656365697665724d6f636b3a20726576657274696e6700000081525060200191505060405180910390fd5b7f28fa6e16458f9c24aa59ddd4085264573006dbe30304837873c7deafc702b038858585855a604051808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200184815260200180602001838152602001828103825284818151815260200191508051906020019080838360005b838110156102e15780820151818401526020810190506102c6565b50505050905090810190601f16801561030e5780820380516001836020036101000a031916815260200191505b50965050505050505060405180910390a16000809054906101000a900460e01b905094935050505056fea265627a7a72315820142b8f08ab065a73fc433eb01bda859fb035c9fad17060d245c878e9630c78e964736f6c63430005100032";
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        name?: undefined;
        constant?: undefined;
        outputs?: undefined;
    } | {
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        payable?: undefined;
        stateMutability?: undefined;
        constant?: undefined;
        outputs?: undefined;
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
    static createInterface(): ERC721ReceiverMockInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC721ReceiverMock;
}
