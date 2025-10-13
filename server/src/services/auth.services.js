import User from "../models/User.js";

// Register new user
export const registerUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) throw new Error("User already exists");

  const user = new User(userData);
  return await user.save();
};

// Login user
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  if (user.password !== password) throw new Error("Invalid credentials");
  if (!user.isActive) throw new Error("Account is deactivated");

  return user;
};
