import { ApolloServer, gql } from 'apollo-server-express'
import typeDefs from './typeDefs'
import resolvers from './resolvers'

const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers
})

export default graphqlServer