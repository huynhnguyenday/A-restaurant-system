import mongoose from "mongoose";
import Account from "../models/account.model.js";
import jwt from "jsonwebtoken";
import generateToken from "../generateToken.js";

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
  if (!username) missingFields.push("username");
  if (!password) missingFields.push("password");
  if (!numbers) missingFields.push("numbers");
  if (!gmail) missingFields.push("gmail");
  if (!role) missingFields.push("role");

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing fields: ${missingFields.join(", ")}`,
    });
  }

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

    // Tạo JWT token
    const token = jwt.sign(
      {
        id: savedAccount._id,
        username: savedAccount.username,
        role: savedAccount.role,
      },
      process.env.JWT_SECRET, // Bí mật được lưu trong biến môi trường
      { expiresIn: "1h" } // Thời gian sống của token (1 giờ)
    );

    // Trả về thông tin tài khoản và token
    res.status(201).json({
      success: true,
      data: savedAccount,
      token, // Token được trả về
    });
  } catch (error) {
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
    const updatedAccount = await Account.findByIdAndUpdate(id, account, {
      new: true,
    });

    if (!updatedAccount) {
      return res
        .status(404)
        .json({ success: false, message: "Account not found" });
    }

    // Nếu cần tạo token mới (ví dụ khi username hoặc role thay đổi)
    if (account.username || account.role) {
      generateToken(
        res,
        updatedAccount._id,
        updatedAccount.username,
        updatedAccount.role
      );
    }

    res.status(200).json({ success: true, data: updatedAccount });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAccountsById = async (req, res) => {
  const { id } = req.params;

  // Kiểm tra xem ID có hợp lệ không
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Id không hợp lệ",
    });
  }

  try {
    // Tìm tài khoản theo ID
    const account = await Account.findById(id);

    // Nếu không tìm thấy tài khoản
    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy tài khoản",
      });
    }

    // Trả về dữ liệu tài khoản
    res.status(200).json({
      success: true,
      data: account,
    });
  } catch (error) {
    console.error("Lỗi khi tìm tài khoản: ", error.message);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};
