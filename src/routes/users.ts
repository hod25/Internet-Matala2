import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/userController";
import authenticate from "../middleware/authenticate";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authenticate, logoutUser);

export default router;
