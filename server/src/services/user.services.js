import { User } from "../models/index.js";

export const createUser = async (userData) => {
  const existing = await User.findOne({ email: userData.email });
  if (existing) throw new Error("User already exists");

  // TODO: I WILL DO THAT LATER USING ENCRYPTION AND SECUIRITY
  const user = new User(userData);
  return await user.save();
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};
