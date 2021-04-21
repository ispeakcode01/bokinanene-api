import express from 'express'
import graphqlServer from './api'
import dotenv from 'dotenv'

dotenv.config()
const server = express()

server.use(graphqlServer.getMiddleware())

export default server