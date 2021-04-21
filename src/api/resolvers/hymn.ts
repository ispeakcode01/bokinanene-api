import Hymn, { IHymn } from "../model/hymn"
import { } from 'apollo-server-express'
import { getDocuments } from '../db/db'
import PaginationInfo from "../db/types/PaginationInfo"


export default {
    Query: {
        hymns: async function hymns(parent: any, params: PaginationInfo, context: any) {
            return await getDocuments<IHymn>(Hymn, params)
        }
    }
}