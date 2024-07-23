import {Schema, model, models, Document, Model} from 'mongoose'

export interface ICategory  {
    categoryName: string,
    slug: string,
    description: string,
     blogCount: number,
    userId: string
}

export interface ICategoryDocument extends ICategory, Document {
    createdAt: Date,
    updatedAt: Date
}

const CategorySchema = new Schema<ICategoryDocument>({
    categoryName: { type: String },
    slug: { type: String},
    description: { type: String},
    blogCount: { type: Number},
    userId: { type : String}
}
,{
    timestamps: true
})

const Category: Model<ICategoryDocument> = models.Category || model("Category", CategorySchema)

export default Category