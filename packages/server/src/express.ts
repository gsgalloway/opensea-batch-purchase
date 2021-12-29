import { getNetwork, InfuraProvider } from '@ethersproject/providers'
import { Token } from '@standard-crypto/opensea-batch-purchaser-openapi/dist/types/model/models'
import { MetaTransaction } from 'ethers-multisend'
import express, { Request } from 'express'
import { OpenSeaAsset } from 'opensea-js/lib/types'

import API from './api'

const openseaMainnetApiKey = process.env.OPENSEA_API_KEY_MAINNET
if (openseaMainnetApiKey === undefined || openseaMainnetApiKey === '') {
  throw new Error('openseaMainnetApiKey not set')
}

const openseaRinkebyApiKey = process.env.OPENSEA_API_KEY_RINKEBY
if (openseaRinkebyApiKey === undefined || openseaRinkebyApiKey === '') {
  throw new Error('openseaRinkebyApiKey not set')
}

const alchemyMainnetApiKey = process.env.ALCHEMY_API_KEY_MAINNET
if (alchemyMainnetApiKey === undefined || alchemyMainnetApiKey === '') {
  throw new Error('alchemyMainnetApiKey not set')
}

const alchemyRinkebyApiKey = process.env.ALCHEMY_API_KEY_RINKEBY
if (alchemyRinkebyApiKey === undefined || alchemyRinkebyApiKey === '') {
  throw new Error('alchemyRinkebyApiKey not set')
}

const api = new API(
  {
    mainnet: openseaMainnetApiKey,
    rinkeby: openseaRinkebyApiKey,
  },
  {
    mainnet: new InfuraProvider('mainnet'),
    rinkeby: new InfuraProvider('rinkeby'),
  },
  {
    mainnet: alchemyMainnetApiKey,
    rinkeby: alchemyRinkebyApiKey,
  }
)

type EmptyObject = Record<string, never>

const _app = express()
_app.use(express.json())

_app.get('/hello', function (req, res) {
  res.send('Hello!')
})

type GetAssetParams = {
  contractAddress: string,
  id: string,
  network: string
}

_app.get('/asset', async function (req: Request<EmptyObject, OpenSeaAsset, EmptyObject, GetAssetParams>, res) {
  const token: Token = req.query;
  const {network: networkName} = req.query;
  const network = getNetwork(networkName);
  const asset = await api.getAsset({token, network})
  res.json(asset);
})

type BatchTransactionParams = {
  tokens: Token[]
  network: string
  recipient: string
}

_app.post('/batch-transaction', async function (req: Request<EmptyObject, MetaTransaction, BatchTransactionParams, EmptyObject>, res, next) {
  try {
    const {tokens, network: networkName, recipient} = req.body;
    const network = getNetwork(networkName);
    const batchTx = await api.createBatchTransaction({tokens, network, tokenRecipientAddr: recipient});
    res.json(batchTx);
  } catch (e) {
    console.error(e);
    next(e);
  }
})

export const app = _app
