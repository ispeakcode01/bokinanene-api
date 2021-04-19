import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'

const server = express()

const typeDefs = gql`
    type Query {
      hello: String
    }
  `;

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        hello: function hello() {
            return 'hello world'
        },
    },
};


const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers
})

server.use(graphqlServer.getMiddleware())

export default server