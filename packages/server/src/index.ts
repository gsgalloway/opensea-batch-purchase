import dotenv from 'dotenv'
import { app } from './express'
import http from 'http'

http.createServer(app).listen(8080)
