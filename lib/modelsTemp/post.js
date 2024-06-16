import { Schema, model, models } from 'mongoose';

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 5,
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
  category: {
    type: String,
    required: true,
    minLength: 1,
  },
  image: {
    type: String,
    required: false,
    minLength: 1,
  },
  summary: {
    type: String,
    required: false,
    minLength: 1,
  },
  content: {
    type: String,
    required: false,
    minLength:20,
  }
});
const Post = models.Post || model('Post', postSchema);

export default Post;
