import mongoose, { Document, Model } from 'mongoose'
import PageInfo from './types/PageInfo'
import PaginationInfo from './types/PaginationInfo'
import _ from 'lodash'

export function getDocuments<T extends Document>(model: Model<T>, paginationInfo: PaginationInfo) {
    let { first, last, before, after } = paginationInfo

    if (!first && !last)
        return Promise.reject('Must provide one of first or last')

    if (first && last)
        return Promise.reject('Providing first and last is not supported.')

    if (first && before)
        return Promise.reject('using first with before is not supported')

    if (last && after)
        return Promise.reject('using last with after is not supported')

    let query = model.find()

    if (before)
        query.where('_id').lt(mongoose.Types.ObjectId(before))

    if (after)
        query.where('_id').gt(mongoose.Types.ObjectId(after))


    if (first)
        query.limit(first)

    let reversed = false
    if (last) {
        query = query.sort({ '_id': 'descending' }).limit(last)
        reversed = true
    }

    return query.exec().then(async result => {

        console.log(result)

        if (reversed)
            result = _.reverse(result)

        const pageInfo: PageInfo = {
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: "",
            endCursor: ""
        }

        let mappedResult: any = []
        if (result) {
            mappedResult = result.map(doc => ({ node: doc, cursor: doc.id }))

            let startCursor = mappedResult[0].cursor
            let endCursor = mappedResult[mappedResult.length - 1].cursor

            const countLeft = await model.find().where('_id').lt(mongoose.Types.ObjectId(startCursor)).limit(1).countDocuments().exec()
            const countRight = await model.find().where('_id').gt(mongoose.Types.ObjectId(endCursor)).limit(1).countDocuments().exec()

            if (countLeft > 0)
                pageInfo.hasPreviousPage = true

            if (countRight > 0)
                pageInfo.hasNextPage = true

            pageInfo.startCursor = startCursor
            pageInfo.endCursor = endCursor

        }

        return {
            edges: mappedResult,
            pageInfo: pageInfo
        }
    })

}
