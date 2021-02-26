import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  title: String,
  message: String,
  author: String,
  tags: [String],
  selectedFile: String,
  likeCound: {
    type: Number,
    default: 0,
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
});

export const Blog = mongoose.model("Blog", blogSchema);
