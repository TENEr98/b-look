import express from "express";

import { blog, createBlog } from "../controllers/blog.js";

const router = express.Router();

router.get("/", blog);
router.post("/", createBlog);

export default router;
