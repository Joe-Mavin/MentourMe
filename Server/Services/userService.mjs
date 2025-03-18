import User from "../models/User.mjs";

// Create a new user
export const createUser = async (data) => {
  return await User.create(data);
};

// Find user by email
export const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};
