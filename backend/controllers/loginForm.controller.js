import Account from "../models/account.model.js";
import generateToken from "../generateToken.js"; // Nhớ import hàm generateToken của bạn
import bcrypt from "bcrypt";
import nodemailer from 'nodemailer';
import crypto from 'crypto'; // Để tạo mã xác thực ngẫu nhiên
import dotenv from "dotenv"
dotenv.config();

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Tìm tài khoản người dùng bằng email
    const user = await Account.findOne({ gmail: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email không tồn tại trong hệ thống",
      });
    }

    // Tạo mã OTP ngẫu nhiên
    const otp = crypto.randomInt(100000, 999999); // Mã OTP 6 chữ số

    // Lưu mã OTP vào cơ sở dữ liệu (có thể lưu vào một trường tạm thời trong tài khoản)
    user.otp = otp;
    await user.save();

    // Log thông tin user và pass để kiểm tra
    console.log("GMAIL_USER:", process.env.GMAIL_USER);
    console.log("GMAIL_PASS:", process.env.GMAIL_PASS);

    // Cấu hình transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Địa chỉ Gmail của bạn
        pass: process.env.GMAIL_PASS, // Mật khẩu hoặc App Password
      },
    });

    // Kiểm tra kết nối tới SMTP server
    transporter.verify((error, success) => {
      if (error) {
        console.log("Error verifying transporter:", error);
      } else {
        console.log("SMTP server is ready:", success);
      }
    });

    // Cấu hình email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Mã OTP Đặt lại Mật khẩu",
      text: `Mã OTP của bạn là: ${otp}`,
    };

    // Gửi email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email sending error:", error); // Log lỗi gửi email
        return res.status(500).json({
          success: false,
          message: "Gửi email thất bại. Vui lòng thử lại sau.",
        });
      }
      console.log("Email sent:", info); // Log thành công gửi email
      res.status(200).json({
        success: true,
        message: "Mã OTP đã được gửi đến email của bạn.",
      });
    });
  } catch (error) {
    console.error("Error:", error); // Log lỗi tổng quát
    res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra. Vui lòng thử lại sau.",
    });
  }
};

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
