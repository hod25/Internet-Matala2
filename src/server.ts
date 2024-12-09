import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 3000;
const MONGO_URI = "mongodb://localhost:27017/assignment2";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Database connection error:", err));
