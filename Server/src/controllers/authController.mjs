import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import User from "../models/user.mjs";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      status: role === 'mentor' ? 'pending' : 'active', // Set status based on role
    });

    res.status(201).json({ message: "User created successfully", userId: user.id });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role, // Include user role in JWT payload
      },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      message: "Login successful",
      token, // Send token to frontend
      onboarded: user.onboarded, // Send onboarding status
      role: user.role, // Send user role to frontend
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["id", "name", "email", "phone"] });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
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

