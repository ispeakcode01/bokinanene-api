import { gql } from 'apollo-server-express'

export default gql`
    type Hymn {
        id: ID!
        verse: String!
        hymn_number: Int!
        created_at: String!
    }

    extend type Query {
        hymns: String
    }

`