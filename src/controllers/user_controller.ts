// user_controller.ts
import { Request, Response } from "express";
import UserModel from "../models/user_model"; // Example User model

const userController = {
  register: async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, email, password } = req.body;
      const newUser = await UserModel.create({ username, email, password });
      res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ error: "Error registering user" });
    }
  },

  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user || user.password !== password) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }
      res.status(200).json({ message: "Login successful", userId: user._id });
    } catch (error) {
      res.status(500).json({ error: "Error logging in" });
    }
  },

  getById: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Error retrieving user" });
    }
  },

  update: async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(200).json({ message: "User updated", user: updatedUser });
    } catch (error) {
      res.status(500).json({ error: "Error updating user" });
    }
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting user" });
    }
  },
};

export default userController;
