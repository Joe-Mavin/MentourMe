import bcrypt from "bcryptjs";
import User from "../models/user.mjs";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to database
    const newUser = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["id", "name", "email", "phone"] });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

