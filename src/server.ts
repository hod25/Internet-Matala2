import express, { Express, Application } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/users_routes";
import commentsRoutes from "./routes/comments_routes";
import mongoose from "mongoose";
import comments_routes from "./routes/comments_routes";

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app: Application = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "", {
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit the process with failure
  });

// Use routes
app.use("/api/comments", commentsRoutes); // Route for handling comments
app.use("/api/posts", postRoutes); // Route for handling posts

// Root endpoint
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Set up the server to listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default initApp; // Export the function as default
