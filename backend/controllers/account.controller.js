import mongoose from "mongoose";
import Account from "../models/account.model.js";
export const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json({ success: true, data: accounts });
  } catch (error) {
    console.error("Error fetching accounts: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createAccount = async (req, res) => {
  const { username, password, numbers, gmail, role } = req.body;

  const missingFields = [];
  // Kiểm tra các trường dữ liệu bắt buộc
  if (!username) missingFields.push("username");
  if (!password) missingFields.push("password");
  if (!numbers) missingFields.push("numbers");
  if (!gmail) missingFields.push("gmail");
  if (!role) missingFields.push("role");

  // Nếu có trường bị thiếu, trả về danh sách các trường đó
  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing fields: ${missingFields.join(", ")}`,
    });
  }

  // Kiểm tra role hợp lệ
  const validRoles = ["admin", "staff", "customer"];
  if (!validRoles.includes(role)) {
    return res.status(400).json({
      success: false,
      message: `Invalid role. Allowed roles: ${validRoles.join(", ")}`,
    });
  }

  try {
    // Tạo tài khoản mới
    const newAccount = new Account({
      username,
      password,
      gmail,
      numbers,
      role,
    });
    const savedAccount = await newAccount.save();

    // Trả về kết quả
    res.status(201).json({ success: true, data: savedAccount });
  } catch (error) {
    if (error.code === 11000) {
      // Mã lỗi MongoDB khi trùng lặp
      console.error("Duplicate key error:", error);
      return res.status(400).json({
        success: false,
        message: `Duplicate key error: ID or username already exists`,
      });
    }
    console.error("Error creating account:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateAccount = async (req, res) => {
  const { id } = req.params;

  const account = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid account ID" });
  }

  try {
    const updateAccount = await Account.findByIdAndUpdate(id, account, {
      new: true,
    });
    res.status(200).json({ success: true, data: updateAccount });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
