import { Schema, model, models } from 'mongoose';

const BlogSchema = new Schema({
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
  }
});
const Blog = models.Blog || model('Blog', BlogSchema);

export default Blog;
