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
exports.app = void 0;
const providers_1 = require("@ethersproject/providers");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./api"));
const ethers_1 = require("ethers");
const openseaMainnetApiKey = process.env.OPENSEA_API_KEY_MAINNET;
if (openseaMainnetApiKey === undefined || openseaMainnetApiKey === '') {
    throw new Error('OPENSEA_API_KEY_MAINNET not set');
}
const openseaRinkebyApiKey = process.env.OPENSEA_API_KEY_RINKEBY;
if (openseaRinkebyApiKey === undefined || openseaRinkebyApiKey === '') {
    throw new Error('OPENSEA_API_KEY_RINKEBY not set');
}
const alchemyMainnetApiKey = process.env.ALCHEMY_API_KEY_MAINNET;
if (alchemyMainnetApiKey === undefined || alchemyMainnetApiKey === '') {
    throw new Error('ALCHEMY_API_KEY_MAINNET not set');
}
const alchemyRinkebyApiKey = process.env.ALCHEMY_API_KEY_RINKEBY;
if (alchemyRinkebyApiKey === undefined || alchemyRinkebyApiKey === '') {
    throw new Error('ALCHEMY_API_KEY_RINKEBY not set');
}
const api = new api_1.default({
    mainnet: openseaMainnetApiKey,
    rinkeby: openseaRinkebyApiKey,
}, {
    mainnet: new providers_1.InfuraProvider('mainnet'),
    rinkeby: new providers_1.InfuraProvider('rinkeby'),
}, {
    mainnet: alchemyMainnetApiKey,
    rinkeby: alchemyRinkebyApiKey,
});
const _app = (0, express_1.default)();
_app.use(express_1.default.json());
_app.use((0, cors_1.default)({
    origin: '*',
}));
_app.get('/hello', function (req, res) {
    res.send('Hello!');
});
_app.get('/asset', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.query;
        const { network: networkName } = req.query;
        const network = (0, providers_1.getNetwork)(networkName);
        try {
            const asset = yield api.getAsset({ token, network });
            res.json(asset);
        }
        catch (e) {
            if (e instanceof Error) {
                if (e.message.includes('404: Not found')) {
                    res.sendStatus(404);
                    res.send('');
                }
                else {
                    console.error(e);
                    next(e);
                }
            }
            else if (typeof e === 'string') {
                console.error(e);
                next(e);
            }
        }
    });
});
_app.post('/batch-transaction', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { tokens, network: networkName, recipient, gnosisSafeAddress } = req.body;
            const network = (0, providers_1.getNetwork)(networkName);
            const safeTx = yield api.createBatchTransaction({
                tokens,
                network,
                tokenRecipientAddr: recipient,
                safeAddr: gnosisSafeAddress,
            });
            res.json(Object.assign(Object.assign({}, safeTx), { value: ethers_1.BigNumber.from(safeTx.value).toString(), operation: ethers_1.BigNumber.from(safeTx.operation).toString(), safeTxGas: ethers_1.BigNumber.from(safeTx.safeTxGas).toString(), baseGas: ethers_1.BigNumber.from(safeTx.baseGas).toString(), gasPrice: ethers_1.BigNumber.from(safeTx.gasPrice).toString(), nonce: ethers_1.BigNumber.from(safeTx.nonce).toString() }));
        }
        catch (e) {
            console.error(e);
            next(e);
        }
    });
});
exports.app = _app;
