import express from "express";
import { createComment } from "../controllers/comments";

const router = express.Router();

router.post("/", createComment); // Create a new comment (top-level or nested)

export default router;
