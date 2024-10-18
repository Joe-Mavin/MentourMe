import { Router } from "express";
import { registerUser } from '../controllers/registerUser.mjs';

const userRouter = Router();

// Define the user registration route
userRouter.route('/v1/api/register')
          .post(registerUser);

export default userRouter;
