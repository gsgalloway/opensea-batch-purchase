import { getNetwork, InfuraProvider } from '@ethersproject/providers'
import { Token, SafeTransaction } from '@standard-crypto/opensea-batch-purchaser-openapi/dist/types/model/models'
import express, { Request } from 'express'
import { OpenSeaAsset } from 'opensea-js/lib/types'
import cors from 'cors';

import API from './api'
import { BigNumber } from 'ethers'

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
_app.use(cors({
  origin: "*",
}))

_app.get('/hello', function (req, res) {
  res.send('Hello!')
})

type GetAssetParams = {
  contractAddress: string,
  id: string,
  network: string
}

_app.get('/asset', async function (req: Request<EmptyObject, OpenSeaAsset | '', EmptyObject, GetAssetParams>, res, next) {
  const token: Token = req.query;
  const {network: networkName} = req.query;
  const network = getNetwork(networkName);
  try {
    const asset = await api.getAsset({token, network})
    res.json(asset);
  } catch (e) {
    if (e instanceof Error) {
      if (e.message.includes('404: Not found')) {
        res.sendStatus(404)
        res.send('');
      } else {
        console.error(e);
        next(e)
      }
    } else if (typeof e === "string") {
      console.error(e)
      next(e)
    }
  }
})

type BatchTransactionParams = {
  tokens: Token[]
  network: string
  recipient: string
  gnosisSafeAddress: string
}

_app.post('/batch-transaction', async function (req: Request<EmptyObject, SafeTransaction, BatchTransactionParams, EmptyObject>, res, next) {
  try {
    const {tokens, network: networkName, recipient, gnosisSafeAddress} = req.body;
    const network = getNetwork(networkName);
    const safeTx = await api.createBatchTransaction({tokens, network, tokenRecipientAddr: recipient, safeAddr: gnosisSafeAddress});
    res.json({
      ...safeTx,
      value: BigNumber.from(safeTx.value).toString(),
      operation: BigNumber.from(safeTx.operation).toString(),
      safeTxGas: BigNumber.from(safeTx.safeTxGas).toString(),
      baseGas: BigNumber.from(safeTx.baseGas).toString(),
      gasPrice: BigNumber.from(safeTx.gasPrice).toString(),
      nonce: BigNumber.from(safeTx.nonce).toString(),
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
})

export const app = _app
