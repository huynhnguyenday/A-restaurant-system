import express from "express";
import {
  createAccount,
  getAccounts,
  updateAccount,
} from "../controllers/account.controller.js";
import { protect } from "../middleware/protect.js"; // Import middleware protect

const router = express.Router();

// Bảo vệ các route cần đăng nhập
router.get("/", protect, getAccounts); // Chỉ admin hoặc staff đã đăng nhập mới được xem danh sách account
router.post("/", createAccount); // Chỉ admin mới được tạo account mới
router.put("/:id", updateAccount); // Chỉ admin hoặc staff mới được cập nhật thông tin account

export default router;
