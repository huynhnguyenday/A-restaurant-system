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
        message: "Nhập sai tên người dùng",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Mật khẩu không trùng khớp",
      });
    }

    // Tạo JWT token
    const token = generateToken(res, user._id, user.username, user.role);

    // Trả về thông tin người dùng và token
    res.status(200).json({
      success: true,
      message: "Đăng nhập thành công",
      token, // Include the token in the response
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

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  try {
    // Tìm tài khoản người dùng
    const user = await Account.findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy tài khoản này",
      });
    }

    // So sánh mật khẩu cũ
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Mật khẩu cũ không đúng",
      });
    }

    // Kiểm tra xem mật khẩu mới và xác nhận mật khẩu có khớp không
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "Mật khẩu mới và xác nhận mật khẩu không khớp",
      });
    }

    // Kiểm tra xem mật khẩu mới có khác mật khẩu cũ không
    const isOldPasswordSame = await bcrypt.compare(newPassword, user.password);
    if (isOldPasswordSame) {
      return res.status(400).json({
        success: false,
        message: "Mật khẩu mới không được giống mật khẩu cũ",
      });
    }

    // Mã hóa mật khẩu mới
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Cập nhật mật khẩu mới vào cơ sở dữ liệu
    user.password = hashedPassword;
    await user.save();

    // Trả về thông báo thành công
    return res.status(200).json({
      success: true,
      message: "Đổi mật khẩu thành công",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Không thể thay đổi mật khẩu. Vui lòng thử lại sau.",
    });
  }
};

export const logout = (req, res) => {
  // Xóa JWT token trong cookie
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Bảo đảm token chỉ bị xóa trong môi trường bảo mật
      sameSite: "strict",
    });

    res.status(200).json({ success: true, message: "Đăng xuất thành công" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Đăng xuất thất bại" });
  }
};
