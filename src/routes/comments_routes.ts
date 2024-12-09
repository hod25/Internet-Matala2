import { Request, Response } from "express";
import Comment from "../models/comments_Model"; 

class CommentsController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const comments = await Comment.find(); // Fetch comments
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve comments" });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const comment = await Comment.findById(req.params.id); // Find by ID
      if (comment) {
        res.status(200).json(comment);
      } else {
        res.status(404).json({ error: "Comment not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve comment" });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const newComment = new Comment(req.body); // Create new comment
      await newComment.save();
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ error: "Failed to create comment" });
    }
  }
}

export default new CommentsController();
