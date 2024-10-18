import { userData } from '../utils/database/userData'

export const registerUser = (req,res) => {
    const { name, email, password, phone } = req.body;

  // Basic validation
  if (!name || !email || !password || !phone) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if the email already exists
  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return res.status(409).json({ message: 'User with this email already exists' });
  }

  // Save the new user
  const newUser = { id: users.length + 1, name, email, password, phone };
  users.push(newUser);

  // Respond with success message
  res.status(201).json({ message: 'User registered successfully', user: newUser });
};