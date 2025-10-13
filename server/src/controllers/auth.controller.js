import * as authService from "../services/index.js";

// REGISTER CONTROLLER
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await authService.registerUser({
      name,
      email,
      password,
      role,
    });
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// LOGIN CONTROLLER
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const user = await authService.loginUser(email, password);
    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
