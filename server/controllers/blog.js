import { Blog } from "../models/blog.js";

export const blog = async (req, res) => {
  try {
    const result = await Blog.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createBlog = async (req, res) => {
  const post = req.body;
  const newBlog = new Blog(post);
  try {
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
  console.log(req);
  res.send("POST CREATED");
};
