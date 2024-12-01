// models/account.model.js
import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // Đảm bảo không trùng username
  },
  password: {
    type: String,
    required: true,
  },
  numbers: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true, // Mặc định là active
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "staff", "customer"], // Liệt kê các giá trị có thể
    required: true,
  },
});

const Account = mongoose.model("Account", accountSchema);

export default Account;
