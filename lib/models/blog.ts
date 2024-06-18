import { Schema, model, Model, Document, models } from 'mongoose';
import { IMediaDocument } from './media';

export interface IBlog {
  title: string,
  slug: string,
  body: string,
  author:string,
  metaDescription:string,
  categories: String[],
  published: boolean,
  bodyImages: string[],
  featuredImage: IMediaDocument
}

export interface IBlogDocument extends IBlog, Document {
  createdAt: Date,
  updatedAt: Date
}

const BlogSchema = new Schema<IBlogDocument>({
  title: {
    type: String,
    required: true,
    minLength: 1,
  },
  slug: {
    type: String,
    required: true,
    minLenght: 1
  },
  body: {
    type: String,
    required: true,
    minLength:20,
  },
  author: {
    type:String,
    required: true
  },
  metaDescription: {
    type: String,
    required: true,
    minLength:1,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  categories: {
    type: Array,
    required: true,
  },
  published: {
    type: Boolean,
    required:true
  },
  bodyImages: {
    type: Array,
    required: false
  },
  featuredImage: {
    type: 
  }
});
const Blog = models.Blog || model('Blog', BlogSchema);

export default Blog;
