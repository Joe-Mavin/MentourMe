import { Router } from "express";
import { registerUser } from '../controllers/registerUser.mjs';

const userRouter = Router();

// Define the user registration route
userRouter.route('/api/v1/register')
          .post(registerUser);
userRouter.route('api/v1/login')
          .post(loginUser)
export default userRouter;
