// middleware/authenticateUser.mjs
import jwt from 'jsonwebtoken';

const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = decoded; // Attach the decoded user info to the request object
    next(); // Move to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authenticateUser;
