import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
  content: string;
  post: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  parentComment?: mongoose.Types.ObjectId; // Add parentComment for nesting
}

const CommentSchema = new Schema<IComment>({
  content: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  parentComment: { type: Schema.Types.ObjectId, ref: "Comment", default: null }, // Default is null for top-level comments
});

export default mongoose.model<IComment>("Comment", CommentSchema);
