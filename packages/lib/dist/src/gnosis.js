"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSafeTransaction = void 0;
const providers_1 = require("@ethersproject/providers");
const safe_service_client_1 = __importDefault(require("@gnosis.pm/safe-service-client"));
async function getSafeTransaction(safeTxHash, network = "mainnet") {
    const _network = await (0, providers_1.getNetwork)(network);
    let safeServiceURL;
    switch (_network.chainId) {
        case 1: // mainnet
            safeServiceURL = "https://safe-transaction.gnosis.io";
            break;
        case 4: // rinkeby
            safeServiceURL = "https://safe-transaction.rinkeby.gnosis.io";
            break;
        default:
            throw new Error(`unsupported network ${_network.name}`);
    }
    const safeService = new safe_service_client_1.default(safeServiceURL);
    return await safeService.getTransaction(safeTxHash);
}
exports.getSafeTransaction = getSafeTransaction;
