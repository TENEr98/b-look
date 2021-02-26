import express from "express";

import { signIn } from "../controllers/auth.js";

const router = express.Router();

router.get("/", signIn);

export default router;
