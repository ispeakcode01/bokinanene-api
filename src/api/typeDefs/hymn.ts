import { gql } from 'apollo-server-express'

export default gql`
    type Hymn {
        id: ID
        verse: String
        hymn_number: Int
        created_at: String
    }

    type HymnEdge {
        node: Hymn
        cursor: String
    }

    type HymnConnection {
        edges: [HymnEdge],
        pageInfo: PageInfo
    }

    extend type Query {
        hymns(first: Int, last: Int, before: String, after: String): HymnConnection
    }

`