"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const opensea_js_1 = require("opensea-js");
const types_1 = require("opensea-js/lib/types");
const providers_1 = require("@ethersproject/providers");
const opensea_batch_purchaser_1 = __importDefault(require("@standard-crypto/opensea-batch-purchaser"));
class API {
    constructor(openseaApiKeys, ethProviders, alchemyApiKeys) {
        this.openseaApiKeys = openseaApiKeys;
        this.ethProviders = ethProviders;
        this.alchemyApiKeys = alchemyApiKeys;
    }
    openseaApiKeyFromNetwork(network) {
        switch (network.name) {
            case 'homestead':
                return this.openseaApiKeys.mainnet;
            case 'rinkeby':
                return this.openseaApiKeys.rinkeby;
            default:
                throw new Error(`Unsupported network ${network.name}`);
        }
    }
    alchemyApiKeyFromNetwork(network) {
        switch (network.name) {
            case 'homestead':
                return this.alchemyApiKeys.mainnet;
            case 'rinkeby':
                return this.alchemyApiKeys.rinkeby;
            default:
                throw new Error(`Unsupported network ${network.name}`);
        }
    }
    ethProviderFromNetwork(network) {
        switch (network.name) {
            case 'homestead':
                return this.ethProviders.mainnet;
            case 'rinkeby':
                return this.ethProviders.rinkeby;
            default:
                throw new Error(`Unsupported network ${network.name}`);
        }
    }
    openseaNetworkName(network) {
        switch (network.name) {
            case 'homestead':
                return types_1.Network.Main;
            case 'rinkeby':
                return types_1.Network.Rinkeby;
            default:
                throw new Error(`Unsupported network ${network.name}`);
        }
    }
    getAsset({ token, network }) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiKey = this.openseaApiKeyFromNetwork(network);
            const networkName = this.openseaNetworkName(network);
            const alchemyApiKey = this.alchemyApiKeyFromNetwork(network);
            const alchemyProvider = new providers_1.AlchemyProvider(network, alchemyApiKey);
            const seaport = new opensea_js_1.OpenSeaPort(alchemyProvider, { networkName, apiKey });
            return yield seaport.api.getAsset({ tokenAddress: token.contractAddress, tokenId: token.id });
        });
    }
    createBatchTransaction({ tokens, network, tokenRecipientAddr, safeAddr, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const openseaApiKey = this.openseaApiKeyFromNetwork(network);
            const ethProvider = this.ethProviderFromNetwork(network);
            const alchemyApiKey = this.alchemyApiKeyFromNetwork(network);
            const openseaBulkPurchaser = new opensea_batch_purchaser_1.default(ethProvider, { openseaApiKey, network, alchemyApiKey });
            const purchaseTxs = [];
            for (const token of tokens) {
                // TODO: rate limit
                const purchaseTx = yield openseaBulkPurchaser.createSingleTokenPurchase(token.id, token.contractAddress, tokenRecipientAddr);
                purchaseTxs.push(purchaseTx);
            }
            const metaTx = yield openseaBulkPurchaser.createBatchTxFromPurchases(purchaseTxs);
            const safeTx = yield openseaBulkPurchaser.safeTransactionFromMetaTransaction(metaTx, safeAddr);
            return safeTx;
        });
    }
}
exports.default = API;
