import express, { Express } from "express";
import userRoutes from "./routes/users_routes"; // Import your routes
import bodyParser from "body-parser";
import dotenv from "dotenv";

// Initialize environment variables
dotenv.config();

// Initialize Express app
const app: Express = express();

// Middleware setup
app.use(bodyParser.json()); // Parse JSON body

// API routes
app.use("/api/users", userRoutes);

// Example health check route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Export the app for testing or server setup
export default app;
