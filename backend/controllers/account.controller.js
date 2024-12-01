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

export const getAccountById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Account ID" });
  }

  try {
    const existingAccount = await Account.findOne({ id });
    console.log("Existing account:", existingAccount);

    if (existingAccount) {
      return res.status(400).json({
        success: false,
        message: `Account with ID ${id} already exists`,
      });
    }

    const newAccount = new Account({ id, username, password, numbers, role });
    const savedAccount = await newAccount.save();
    console.log("Saved account:", savedAccount);

    res.status(201).json({ success: true, data: savedAccount });
  } catch (error) {
    console.error("Error fetching account: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createAccount = async (req, res) => {
  const { id, username, password, numbers, role } = req.body;

  // Kiểm tra các trường dữ liệu bắt buộc
  if (!id || !username || !password || !numbers || !role) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
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
    // Kiểm tra xem ID đã tồn tại chưa
    const existingAccount = await Account.findOne({ id });
    if (existingAccount) {
      return res.status(400).json({
        success: false,
        message: `Account with ID ${id} already exists`,
      });
    }

    // Tạo tài khoản mới
    const newAccount = new Account({ id, username, password, numbers, role });
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
