import { gql } from 'apollo-server-express'

export default gql`

    interface Node {
        id: ID!
    }

    type PageInfo {
        hasPreviousPage: Boolean
        hasNextPage: Boolean
        startCursor: String
        endCursor: String
    }

    type Query {
        node(id: ID) : Node
    }
    
`