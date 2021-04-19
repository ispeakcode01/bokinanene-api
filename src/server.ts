import express from 'express'
import graphqlServer from './api'

const server = express()

server.use(graphqlServer.getMiddleware())

export default server