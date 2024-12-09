import postModel from "../models/posts_Model";
import { Request, Response } from "express";
import baseController from "./base_controller";

const postsController = new baseController(postModel);

export default postsController;