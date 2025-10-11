import * as userService from "../services/index.js";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await userService.createUser({ name, email, password, role });
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
