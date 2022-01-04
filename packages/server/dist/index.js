"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = require("./express");
const http_1 = __importDefault(require("http"));
const port = 8080;
http_1.default.createServer(express_1.app).listen(port);
console.log(`server listening on ${port}`);
