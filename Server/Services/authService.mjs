import bcrypt from 'bcryptjs';
import  jwt  from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/userModel.mjs';


const registerUser = async (userData) => {
  const { name, email, password, phone } = userData;

  // Check if user already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('Email already in use');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  return await createUser({ name, email, password: hashedPassword,phone });
};

export const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Invalid email or password');
  }

  // User is authenticated. Handle token generation here (e.g., JWT).
  return user;
};

// Generate JWT token for authenticated user
const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
  };
  
  const secret = process.env.JWT_SECRET || 'your_jwt_secret'; // Use an environment variable for your secret
  const options = { expiresIn: '1h' }; // Token expiration (can be adjusted)
  
  return jwt.sign(payload, secret, options);
};

export default {registerUser,loginUser,generateToken}
