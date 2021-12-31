import { Signer } from "ethers";
import { Web3Provider, Network } from '@ethersproject/providers';
import { OpenSeaAsset, Order } from "opensea-js/lib/types";

export type ForSaleAsset = OpenSeaAsset & {
    sellOrders: Order[]
}

export type NetworkConnectionInfo = {
    provider: any,
    web3Provider: Web3Provider,
    signer: Signer,
    address: string,
    network: Network
}

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isForSale(asset: OpenSeaAsset): asset is ForSaleAsset {
    return asset.sellOrders !== undefined && 
        asset.sellOrders !== null &&
        asset.sellOrders.length > 0;
}

export function unreachable(value: never, message: string): Error {
    throw new Error(message)
}
