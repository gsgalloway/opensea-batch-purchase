import dotenv from 'dotenv'
dotenv.config();

import { app } from './express'
import http from 'http'


const port = 8080

http.createServer(app).listen(port)
console.log(`server listening on ${port}`)
