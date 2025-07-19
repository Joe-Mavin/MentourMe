import User from "../models/user.mjs";
import jwt from "jsonwebtoken";

export const getUsers = (req, res) => {
    res.status(200).json({ message: "Users retrieved successfully", users: [] });
  };

export const getProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findByPk(decoded.id, {
      attributes: ["id", "name", "email", "phone", "onboarded", "createdAt", "updatedAt"]
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
  