import userModel from "../models/user_model";
import BaseController from "./base_controller";

const usersController = new BaseController(userModel);

export default usersController;