import { Document, model, Model, Schema } from "mongoose"

export interface IHymn extends Document {
    verse: String,
    hymn_number: Number,
    created_at: String
}

const HymnSchema = new Schema({
    verse: {
        type: String,
        required: true
    },
    hymn_number: {
        type: Number,
        required: true
    },
    created_at: String,

})

const Hymn: Model<IHymn> = model('Hymn', HymnSchema)

export default Hymn