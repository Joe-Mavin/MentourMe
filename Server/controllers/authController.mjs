import authService from '../Services/authService.mjs';

export const registerUser = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate user input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Call AuthService for login
    const user = await authService.loginUser(email, password);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Optionally, you can generate a JWT token for the logged-in user
    const token = authService.generateToken(user);

    // Return success with user details and token
    return res.status(200).json({ message: 'Login successful', user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error, please try again later' });
  }
};






