import express from "express";
import {
  login,
  logout,
  resetPassword,
} from "../controllers/loginForm.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/reset-password", resetPassword);

export default router;
