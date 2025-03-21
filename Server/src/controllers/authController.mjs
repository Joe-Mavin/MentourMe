import bcrypt from "bcryptjs";
import User from "../models/user.mjs";

export const signup = async (req, res) => {
  try {
    console.log("Received body:", req.body); // ✅ Log request body for debugging

    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to database
    const newUser = await User.create({ name, email, password: hashedPassword, phone });

    res.status(201).json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    console.error("Signup error:", error); // ✅ Log error for debugging
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["id", "name", "email", "phone"] });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error); // ✅ Log error for debugging
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};
