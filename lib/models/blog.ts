import { Schema, model, Model, Document, models } from 'mongoose';

// export interface IBlog {
//   title: string,
//   slug: string,
//   body: string,
//   author:string,
//   metaDescription:string,
//   categories: String[],
//   published: boolean,
//   bodyImages?: string[],
//   featuredImage: Object,
//   userId: string
// }

// export interface IBlogDocument extends IBlog, Document {
//   createdAt: Date,
//   updatedAt: Date
// }

// const BlogSchema = new Schema<IBlogDocument>({
//   title: {
//     type: String,
//     required: true,
//     minLength: 1,
//   },
//   slug: {
//     type: String,
//     required: true,
//     minLenght: 1
//   },
//   body: {
//     type: String,
//     required: true,
//     minLength:20,
//   },
//   author: {
//     type:String,
//     required: true
//   },
//   metaDescription: {
//     type: String,
//     required: true,
//     minLength:1,
//   },
//   categories: {
//     type: [String],
//     required: true,
//   },
//   published: {
//     type: Boolean,
//     required:true
//   },
//   bodyImages: {
//     type: [String]
//   },
//   featuredImage: {
//     type: Object,
//     required: true
//   },
//   userId: {
//     type: String,
//     required: true
//   }
// },
// {
//   timestamps: true
// } 
// );
// const Blog = Model<IBlogDocument> = models.Blog || model('Blog', BlogSchema);

export interface IBlog  {
  title: string,
  slug: string,
     body: string,
  author:string,
  metaDescription:string,
  category: string,
  categorySlug: string,
  tags?: string[]
    published: boolean,
    bodyImages?: string[],
    featuredImage: FeaturedImage,
  userId: string
}

export interface IBlogDocument extends IBlog, Document {
  createdAt: Date,
  updatedAt: Date
}

const BlogSchema = new Schema<IBlogDocument>(
  {
  title: { type: String},
  slug: { type: String},
  userId : { type : String},
  body: { type: String},
  author: { type:String},
  metaDescription: {type: String},
  published: {type: Boolean},
  bodyImages: { type: [String]},
  featuredImage: { type: Object},
  category: {type: String},
  categorySlug: {type: String},
  tags: {type: [String]}
}
,{
  timestamps: true
})

const Blog: Model<IBlogDocument> = models.Blog || model("Blog", BlogSchema)


export default Blog;
