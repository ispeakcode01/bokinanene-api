import { gql } from 'apollo-server-express'

export default gql`

    interface Node {
        id: ID!
    }

    type Query {
        node(id: ID) : Node
    }
    
`