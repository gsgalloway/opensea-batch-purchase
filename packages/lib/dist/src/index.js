"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typechain_1 = require("../typechain");
const opensea_js_1 = require("@gsgalloway/opensea-js");
const types_1 = require("@gsgalloway/opensea-js/lib/types");
const providers_1 = require("@ethersproject/providers");
const ethers_1 = require("ethers");
const ethers_multisend_1 = require("ethers-multisend");
const lodash_1 = __importDefault(require("lodash"));
const safe_contracts_1 = require("@gnosis.pm/safe-contracts");
const UINT_BUY_ORDER_LISTING_TIME = 6;
const wyvernExchangeAddress = {
    mainnet: '0x7Be8076f4EA4A4AD08075C2508e481d6C946D12b',
    homestead: '0x7Be8076f4EA4A4AD08075C2508e481d6C946D12b',
    rinkeby: '0x5206e78b21Ce315ce284FB24cf05e0585A93B1d9',
};
var Side;
(function (Side) {
    Side[Side["Buy"] = 0] = "Buy";
    Side[Side["Sell"] = 1] = "Sell";
})(Side || (Side = {}));
class OpenseaBulkPurchaser {
    constructor(provider, config) {
        var _a;
        this.createSingleTokenPurchase = async (tokenId, assetContractAddress, tokenRecipientAddress) => {
            var _a, _b;
            const sellOrder = await this._fetchCheapestSellOrderForToken(tokenId, assetContractAddress);
            const tx = await this.seaport.prepareFulfillOrder({
                order: sellOrder,
                accountAddress: tokenRecipientAddress,
            });
            const newTx = {
                value: ethers_1.BigNumber.from((_a = tx.value) === null || _a === void 0 ? void 0 : _a.toString()),
                to: this.wyvernExchange.address,
                data: (_b = tx.data) !== null && _b !== void 0 ? _b : '',
            };
            return await this._fixBuyOrderListingDate(newTx);
        };
        this.createBatchTxFromPurchases = async (individualPurchases) => {
            const inputs = individualPurchases.map((tx) => {
                return {
                    to: tx.to,
                    value: tx.value.toString(),
                    data: tx.data,
                    operation: ethers_multisend_1.OperationType.Call,
                };
            });
            return (0, ethers_multisend_1.encodeMulti)(inputs);
        };
        this.safeTransactionFromMetaTransaction = async (metaTransaction, safeAddressOrSafeNonce) => {
            let safeNonce;
            if (typeof safeAddressOrSafeNonce === 'number') {
                safeNonce = safeAddressOrSafeNonce;
            }
            else {
                safeNonce = (await typechain_1.GnosisSafe__factory.connect(safeAddressOrSafeNonce, this.provider).nonce()).toNumber();
            }
            return (0, safe_contracts_1.buildSafeTransaction)({
                to: metaTransaction.to,
                nonce: safeNonce,
                operation: ethers_multisend_1.OperationType.DelegateCall,
                data: metaTransaction.data,
            });
        };
        this._fetchCheapestSellOrderForToken = async (_tokenId, assetContractAddress) => {
            const tokenID = ethers_1.BigNumber.from(_tokenId);
            const resp = await this.seaport.api.getOrders({
                asset_contract_address: assetContractAddress,
                side: Side.Sell,
                token_id: tokenID.toString(),
            });
            const cheapestOrder = lodash_1.default.minBy(resp.orders, (order) => order.basePrice.toNumber());
            if (cheapestOrder === undefined) {
                throw new Error(`no orders found for token #${tokenID.toString()} of asset contract ${assetContractAddress}`);
            }
            return cheapestOrder;
        };
        this._fixBuyOrderListingDate = async (originalPurchaseTx) => {
            if (originalPurchaseTx.data === undefined) {
                throw new Error('tx data undefined');
            }
            const parsedTx = this.wyvernExchange.interface.parseTransaction({
                data: originalPurchaseTx.data,
            });
            const [addrs, uints, feeMethodsSidesKindsHowToCalls, calldataBuy, calldataSell, replacementPatternBuy, replacementPatternSell, staticExtradataBuy, staticExtradataSell, vs, rssMetadata,] = parsedTx.args;
            const curBlockNum = await this.provider.getBlockNumber();
            const curBlock = await this.provider.getBlock(curBlockNum);
            const newTimestampForBuyOrder = curBlock.timestamp;
            const newUints = [...uints];
            newUints[UINT_BUY_ORDER_LISTING_TIME] = newTimestampForBuyOrder;
            const fixed = await this.wyvernExchange.populateTransaction.atomicMatch_(addrs, newUints, feeMethodsSidesKindsHowToCalls, calldataBuy, calldataSell, replacementPatternBuy, replacementPatternSell, staticExtradataBuy, staticExtradataSell, vs, rssMetadata, { value: originalPurchaseTx.value });
            if (fixed.data === undefined || fixed.to === undefined || fixed.value === undefined) {
                throw new Error('expect `data`, `to`, and `value` to be defined');
            }
            return {
                data: fixed.data,
                to: fixed.to,
                value: fixed.value,
            };
        };
        config = config !== null && config !== void 0 ? config : {};
        config.network = (_a = config === null || config === void 0 ? void 0 : config.network) !== null && _a !== void 0 ? _a : 'mainnet';
        this.provider = provider;
        const alchemyProvider = new providers_1.AlchemyProvider(config.network, config === null || config === void 0 ? void 0 : config.alchemyApiKey);
        const networkName = (0, providers_1.getNetwork)(config.network).name;
        let openseaNetworkName;
        switch (networkName) {
            case 'mainnet':
            case 'homestead':
                openseaNetworkName = types_1.Network.Main;
                break;
            case 'rinkeby':
                openseaNetworkName = types_1.Network.Rinkeby;
                break;
            default:
                throw new Error(`network ${networkName} is not supported by opensea-js`);
        }
        this.seaport = new opensea_js_1.OpenSeaPort(alchemyProvider, {
            apiKey: config === null || config === void 0 ? void 0 : config.openseaApiKey,
            networkName: openseaNetworkName,
        });
        this.wyvernExchange = typechain_1.WyvernExchange__factory.connect(wyvernExchangeAddress[networkName], provider);
    }
}
exports.default = OpenseaBulkPurchaser;
