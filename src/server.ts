import express, { Express } from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bodyParser from "body-parser";
import posts_routes from "./routes/posts_route";
import comments_routes from "./routes/comments_routes";
import auth_routes from "./routes/auth_routes";

const initApp = (): Promise<Express> => {
  return new Promise<Express>((resolve, reject) => {
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function () {
      console.log("Connected to the database");
    });
    if (!process.env.DB_CONNECT) {
      reject("DB_CONNECT is not defined");
    } else {
      mongoose
        .connect(process.env.DB_CONNECT)
        .then(() => {
          app.use(bodyParser.json());
          app.use(bodyParser.urlencoded({ extended: true }));
          app.use("/posts", posts_routes);
          app.use("/comments", comments_routes);
          app.use("/auth", auth_routes);
          resolve(app);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};

export default initApp;