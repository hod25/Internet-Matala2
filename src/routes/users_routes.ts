import express, { Request, Response } from "express";
import userController from "../controllers/user_controller";
import { validateToken } from "../middleware/auth"; // Middleware for token validation

const router = express.Router();

// User registration
router.post("/register", (req: Request, res: Response) => userController.register(req, res));

// User login
router.post("/login", (req: Request, res: Response) => userController.login(req, res));

// Get user by ID (protected route)
router.get("/:id", validateToken, (req: Request, res: Response) => userController.getById(req, res));

// Update user profile (protected route)
router.put("/:id", validateToken, (req: Request, res: Response) => userController.update(req, res));

// Delete user (protected route)
router.delete("/:id", validateToken, (req: Request, res: Response) => userController.delete(req, res));

export default router;
