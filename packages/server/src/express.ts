import { InfuraProvider } from '@ethersproject/providers'
// import { Token } from '@standard-crypto/opensea-batch-purchaser-openapi/dist/types/model/models'
import express, { Request } from 'express'

import API from './api'

type Token = any

const mainnetApiKey = process.env.OPENSEA_API_KEY_MAINNET
if (mainnetApiKey === undefined || mainnetApiKey === '') {
  throw new Error('mainnetApiKey not set')
}

const rinkebyApiKey = process.env.OPENSEA_API_KEY_RINKEBY
if (rinkebyApiKey === undefined || rinkebyApiKey === '') {
  throw new Error('rinkebyApiKey not set')
}

type EmptyObject = Record<string, never>

// const _app = express ? express() : express_test()
const _app = express()
_app.use(express.json())

_app.get('/hello', function (req, res) {
  res.send('Hello!')
})

_app.get('/asset', function (req: Request<EmptyObject, string, EmptyObject, Token>, res) {
  const api = new API(
    {
      mainnet: mainnetApiKey,
      rinkeby: rinkebyApiKey,
    },
    new InfuraProvider(),
  )
  const token = req.query
  res.send(token.id)
})

export const app = _app
