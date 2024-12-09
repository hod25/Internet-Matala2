import { Request, Response } from "express";
import Comment from "../models/commentModel";
import Post from "../models/postModel";

export const createComment = async (req: Request, res: Response) => {
  const { content, postId, userId, parentCommentId } = req.body;

  try {
    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // If parentCommentId is provided, validate it exists
    if (parentCommentId) {
      const parentComment = await Comment.findById(parentCommentId);
      if (!parentComment) {
        return res.status(404).json({ message: "Parent comment not found" });
      }
    }

    // Create the comment
    const newComment = new Comment({
      content,
      post: postId,
      user: userId,
      parentComment: parentCommentId || null, // Null for top-level comments
    });

    await newComment.save();
    res.status(201).json({ message: "Comment created successfully", comment: newComment });
  } catch (error) {
    // Explicitly cast error to Error
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};
