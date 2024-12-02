import generateToken from "../generateToken.js";
import Account from '../models/account.model.js'

export const login = async (req, res) => {
  const {username, password } = req.body;

  res.status(200).json({ success: true, message: "Auth user" });
};

export const registerUser = async (req, res) => {
  const {username, password, numbers, gmail} = req.body;

  try{
    const userExists = await Account.findOne({username});
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }
    const role = "customer";

    const newUser = new Account({ username, password, numbers, gmail, role });
    await newUser.save();

    const token = generateToken(newUser._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error){
    console.error("Register error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const forgotPassword = async (req, res) => {
  res.status(200).json({success: true, message: "Register user"})
}

export const resetPassword = async (req, res) => {
  res.status(200).json({success: true, message: "Register user"})
};

export const logout = async (req, res) => {
  res.status(200).json({success: true, message: "Register user"})
};