import { Router } from "express";
import CommentsController from "../controllers/comments_controller";

const router = Router();

router.get("/", CommentsController.getAll); // Fetch all comments
router.get("/:id", CommentsController.getById); // Fetch comment by ID
router.post("/", CommentsController.create); // Create a new comment

export default router;
