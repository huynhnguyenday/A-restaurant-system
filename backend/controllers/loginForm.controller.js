import Account from "../models/account.model.js";
import generateToken from "../generateToken.js"; // Nhớ import hàm generateToken của bạn
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Kiểm tra xem người dùng có tồn tại không
    const user = await Account.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or password", // Nếu không tìm thấy người dùng
      });
    }

    // So sánh mật khẩu người dùng nhập với mật khẩu trong DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }

    // Tạo JWT token
    generateToken(res, user._id); // Gửi token trong cookie

    // Trả về thông tin người dùng và token
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        numbers: user.numbers,
        gmail: user.gmail,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const forgotPassword = async (req, res) => {
  res.status(200).json({ success: true, message: "Register user" });
};

export const resetPassword = async (req, res) => {
  res.status(200).json({ success: true, message: "Register user" });
};

export const logout = async (req, res) => {
  res.status(200).json({ success: true, message: "Register user" });
};
