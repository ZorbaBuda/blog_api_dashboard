import {Schema, model, models, Document, Model} from 'mongoose'

export interface IMedia {
    imageId: string,
    imageUrl: string,
    imageTitle: string,
    altText: string,
    userId: string
}

export interface IMediaDocument extends IMedia, Document {
    createdAt: Date,
    updatedAt: Date
}

const MediaSchema = new Schema<IMediaDocument>({

    imageId : {type : String, required: true},
    imageUrl : {type : String, required: true},
    imageTitle : {type : String, required: true},
    altText : {type : String, required: true},
    userId: {type: String, required: true}
}, {
    timestamps: true
})

const Media : Model<IMediaDocument> = models.Media || model('Media', MediaSchema);

export default Media;