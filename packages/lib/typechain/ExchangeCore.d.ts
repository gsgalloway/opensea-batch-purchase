/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface ExchangeCoreInterface extends ethers.utils.Interface {
  functions: {
    "tokenTransferProxy()": FunctionFragment;
    "staticCall(address,bytes,bytes)": FunctionFragment;
    "changeMinimumMakerProtocolFee(uint256)": FunctionFragment;
    "changeMinimumTakerProtocolFee(uint256)": FunctionFragment;
    "minimumTakerProtocolFee()": FunctionFragment;
    "changeProtocolFeeRecipient(address)": FunctionFragment;
    "protocolFeeRecipient()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "registry()": FunctionFragment;
    "minimumMakerProtocolFee()": FunctionFragment;
    "cancelledOrFinalized(bytes32)": FunctionFragment;
    "owner()": FunctionFragment;
    "exchangeToken()": FunctionFragment;
    "INVERSE_BASIS_POINT()": FunctionFragment;
    "approvedOrders(bytes32)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "tokenTransferProxy",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "staticCall",
    values: [string, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "changeMinimumMakerProtocolFee",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "changeMinimumTakerProtocolFee",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "minimumTakerProtocolFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "changeProtocolFeeRecipient",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "protocolFeeRecipient",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "registry", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "minimumMakerProtocolFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "cancelledOrFinalized",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "exchangeToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "INVERSE_BASIS_POINT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "approvedOrders",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "tokenTransferProxy",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "staticCall", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "changeMinimumMakerProtocolFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeMinimumTakerProtocolFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "minimumTakerProtocolFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeProtocolFeeRecipient",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "protocolFeeRecipient",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "registry", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "minimumMakerProtocolFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "cancelledOrFinalized",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "exchangeToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "INVERSE_BASIS_POINT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approvedOrders",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "OrderApprovedPartOne(bytes32,address,address,address,uint256,uint256,uint256,uint256,address,uint8,uint8,uint8,address)": EventFragment;
    "OrderApprovedPartTwo(bytes32,uint8,bytes,bytes,address,bytes,address,uint256,uint256,uint256,uint256,uint256,bool)": EventFragment;
    "OrderCancelled(bytes32)": EventFragment;
    "OrdersMatched(bytes32,bytes32,address,address,uint256,bytes32)": EventFragment;
    "OwnershipRenounced(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OrderApprovedPartOne"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OrderApprovedPartTwo"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OrderCancelled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OrdersMatched"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipRenounced"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export type OrderApprovedPartOneEvent = TypedEvent<
  [
    string,
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    number,
    number,
    number,
    string
  ] & {
    hash: string;
    exchange: string;
    maker: string;
    taker: string;
    makerRelayerFee: BigNumber;
    takerRelayerFee: BigNumber;
    makerProtocolFee: BigNumber;
    takerProtocolFee: BigNumber;
    feeRecipient: string;
    feeMethod: number;
    side: number;
    saleKind: number;
    target: string;
  }
>;

export type OrderApprovedPartTwoEvent = TypedEvent<
  [
    string,
    number,
    string,
    string,
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    boolean
  ] & {
    hash: string;
    howToCall: number;
    calldata: string;
    replacementPattern: string;
    staticTarget: string;
    staticExtradata: string;
    paymentToken: string;
    basePrice: BigNumber;
    extra: BigNumber;
    listingTime: BigNumber;
    expirationTime: BigNumber;
    salt: BigNumber;
    orderbookInclusionDesired: boolean;
  }
>;

export type OrderCancelledEvent = TypedEvent<[string] & { hash: string }>;

export type OrdersMatchedEvent = TypedEvent<
  [string, string, string, string, BigNumber, string] & {
    buyHash: string;
    sellHash: string;
    maker: string;
    taker: string;
    price: BigNumber;
    metadata: string;
  }
>;

export type OwnershipRenouncedEvent = TypedEvent<
  [string] & { previousOwner: string }
>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export class ExchangeCore extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: ExchangeCoreInterface;

  functions: {
    tokenTransferProxy(overrides?: CallOverrides): Promise<[string]>;

    staticCall(
      target: string,
      calldata: BytesLike,
      extradata: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean] & { result: boolean }>;

    changeMinimumMakerProtocolFee(
      newMinimumMakerProtocolFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    changeMinimumTakerProtocolFee(
      newMinimumTakerProtocolFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    minimumTakerProtocolFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    changeProtocolFeeRecipient(
      newProtocolFeeRecipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    protocolFeeRecipient(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    registry(overrides?: CallOverrides): Promise<[string]>;

    minimumMakerProtocolFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    cancelledOrFinalized(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    exchangeToken(overrides?: CallOverrides): Promise<[string]>;

    INVERSE_BASIS_POINT(overrides?: CallOverrides): Promise<[BigNumber]>;

    approvedOrders(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  tokenTransferProxy(overrides?: CallOverrides): Promise<string>;

  staticCall(
    target: string,
    calldata: BytesLike,
    extradata: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  changeMinimumMakerProtocolFee(
    newMinimumMakerProtocolFee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  changeMinimumTakerProtocolFee(
    newMinimumTakerProtocolFee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  minimumTakerProtocolFee(overrides?: CallOverrides): Promise<BigNumber>;

  changeProtocolFeeRecipient(
    newProtocolFeeRecipient: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  protocolFeeRecipient(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  registry(overrides?: CallOverrides): Promise<string>;

  minimumMakerProtocolFee(overrides?: CallOverrides): Promise<BigNumber>;

  cancelledOrFinalized(
    arg0: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  exchangeToken(overrides?: CallOverrides): Promise<string>;

  INVERSE_BASIS_POINT(overrides?: CallOverrides): Promise<BigNumber>;

  approvedOrders(arg0: BytesLike, overrides?: CallOverrides): Promise<boolean>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    tokenTransferProxy(overrides?: CallOverrides): Promise<string>;

    staticCall(
      target: string,
      calldata: BytesLike,
      extradata: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    changeMinimumMakerProtocolFee(
      newMinimumMakerProtocolFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    changeMinimumTakerProtocolFee(
      newMinimumTakerProtocolFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    minimumTakerProtocolFee(overrides?: CallOverrides): Promise<BigNumber>;

    changeProtocolFeeRecipient(
      newProtocolFeeRecipient: string,
      overrides?: CallOverrides
    ): Promise<void>;

    protocolFeeRecipient(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    registry(overrides?: CallOverrides): Promise<string>;

    minimumMakerProtocolFee(overrides?: CallOverrides): Promise<BigNumber>;

    cancelledOrFinalized(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    exchangeToken(overrides?: CallOverrides): Promise<string>;

    INVERSE_BASIS_POINT(overrides?: CallOverrides): Promise<BigNumber>;

    approvedOrders(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "OrderApprovedPartOne(bytes32,address,address,address,uint256,uint256,uint256,uint256,address,uint8,uint8,uint8,address)"(
      hash?: BytesLike | null,
      exchange?: null,
      maker?: string | null,
      taker?: null,
      makerRelayerFee?: null,
      takerRelayerFee?: null,
      makerProtocolFee?: null,
      takerProtocolFee?: null,
      feeRecipient?: string | null,
      feeMethod?: null,
      side?: null,
      saleKind?: null,
      target?: null
    ): TypedEventFilter<
      [
        string,
        string,
        string,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        string,
        number,
        number,
        number,
        string
      ],
      {
        hash: string;
        exchange: string;
        maker: string;
        taker: string;
        makerRelayerFee: BigNumber;
        takerRelayerFee: BigNumber;
        makerProtocolFee: BigNumber;
        takerProtocolFee: BigNumber;
        feeRecipient: string;
        feeMethod: number;
        side: number;
        saleKind: number;
        target: string;
      }
    >;

    OrderApprovedPartOne(
      hash?: BytesLike | null,
      exchange?: null,
      maker?: string | null,
      taker?: null,
      makerRelayerFee?: null,
      takerRelayerFee?: null,
      makerProtocolFee?: null,
      takerProtocolFee?: null,
      feeRecipient?: string | null,
      feeMethod?: null,
      side?: null,
      saleKind?: null,
      target?: null
    ): TypedEventFilter<
      [
        string,
        string,
        string,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        string,
        number,
        number,
        number,
        string
      ],
      {
        hash: string;
        exchange: string;
        maker: string;
        taker: string;
        makerRelayerFee: BigNumber;
        takerRelayerFee: BigNumber;
        makerProtocolFee: BigNumber;
        takerProtocolFee: BigNumber;
        feeRecipient: string;
        feeMethod: number;
        side: number;
        saleKind: number;
        target: string;
      }
    >;

    "OrderApprovedPartTwo(bytes32,uint8,bytes,bytes,address,bytes,address,uint256,uint256,uint256,uint256,uint256,bool)"(
      hash?: BytesLike | null,
      howToCall?: null,
      calldata?: null,
      replacementPattern?: null,
      staticTarget?: null,
      staticExtradata?: null,
      paymentToken?: null,
      basePrice?: null,
      extra?: null,
      listingTime?: null,
      expirationTime?: null,
      salt?: null,
      orderbookInclusionDesired?: null
    ): TypedEventFilter<
      [
        string,
        number,
        string,
        string,
        string,
        string,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean
      ],
      {
        hash: string;
        howToCall: number;
        calldata: string;
        replacementPattern: string;
        staticTarget: string;
        staticExtradata: string;
        paymentToken: string;
        basePrice: BigNumber;
        extra: BigNumber;
        listingTime: BigNumber;
        expirationTime: BigNumber;
        salt: BigNumber;
        orderbookInclusionDesired: boolean;
      }
    >;

    OrderApprovedPartTwo(
      hash?: BytesLike | null,
      howToCall?: null,
      calldata?: null,
      replacementPattern?: null,
      staticTarget?: null,
      staticExtradata?: null,
      paymentToken?: null,
      basePrice?: null,
      extra?: null,
      listingTime?: null,
      expirationTime?: null,
      salt?: null,
      orderbookInclusionDesired?: null
    ): TypedEventFilter<
      [
        string,
        number,
        string,
        string,
        string,
        string,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean
      ],
      {
        hash: string;
        howToCall: number;
        calldata: string;
        replacementPattern: string;
        staticTarget: string;
        staticExtradata: string;
        paymentToken: string;
        basePrice: BigNumber;
        extra: BigNumber;
        listingTime: BigNumber;
        expirationTime: BigNumber;
        salt: BigNumber;
        orderbookInclusionDesired: boolean;
      }
    >;

    "OrderCancelled(bytes32)"(
      hash?: BytesLike | null
    ): TypedEventFilter<[string], { hash: string }>;

    OrderCancelled(
      hash?: BytesLike | null
    ): TypedEventFilter<[string], { hash: string }>;

    "OrdersMatched(bytes32,bytes32,address,address,uint256,bytes32)"(
      buyHash?: null,
      sellHash?: null,
      maker?: string | null,
      taker?: string | null,
      price?: null,
      metadata?: BytesLike | null
    ): TypedEventFilter<
      [string, string, string, string, BigNumber, string],
      {
        buyHash: string;
        sellHash: string;
        maker: string;
        taker: string;
        price: BigNumber;
        metadata: string;
      }
    >;

    OrdersMatched(
      buyHash?: null,
      sellHash?: null,
      maker?: string | null,
      taker?: string | null,
      price?: null,
      metadata?: BytesLike | null
    ): TypedEventFilter<
      [string, string, string, string, BigNumber, string],
      {
        buyHash: string;
        sellHash: string;
        maker: string;
        taker: string;
        price: BigNumber;
        metadata: string;
      }
    >;

    "OwnershipRenounced(address)"(
      previousOwner?: string | null
    ): TypedEventFilter<[string], { previousOwner: string }>;

    OwnershipRenounced(
      previousOwner?: string | null
    ): TypedEventFilter<[string], { previousOwner: string }>;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;
  };

  estimateGas: {
    tokenTransferProxy(overrides?: CallOverrides): Promise<BigNumber>;

    staticCall(
      target: string,
      calldata: BytesLike,
      extradata: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    changeMinimumMakerProtocolFee(
      newMinimumMakerProtocolFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    changeMinimumTakerProtocolFee(
      newMinimumTakerProtocolFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    minimumTakerProtocolFee(overrides?: CallOverrides): Promise<BigNumber>;

    changeProtocolFeeRecipient(
      newProtocolFeeRecipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    protocolFeeRecipient(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    registry(overrides?: CallOverrides): Promise<BigNumber>;

    minimumMakerProtocolFee(overrides?: CallOverrides): Promise<BigNumber>;

    cancelledOrFinalized(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    exchangeToken(overrides?: CallOverrides): Promise<BigNumber>;

    INVERSE_BASIS_POINT(overrides?: CallOverrides): Promise<BigNumber>;

    approvedOrders(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    tokenTransferProxy(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    staticCall(
      target: string,
      calldata: BytesLike,
      extradata: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    changeMinimumMakerProtocolFee(
      newMinimumMakerProtocolFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    changeMinimumTakerProtocolFee(
      newMinimumTakerProtocolFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    minimumTakerProtocolFee(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    changeProtocolFeeRecipient(
      newProtocolFeeRecipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    protocolFeeRecipient(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    registry(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    minimumMakerProtocolFee(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    cancelledOrFinalized(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    exchangeToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    INVERSE_BASIS_POINT(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approvedOrders(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
