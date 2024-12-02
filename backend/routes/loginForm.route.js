import express from "express";
import { login } from "../controllers/loginForm.controller.js";

const router = express.Router();

router.get("/auth", login);

export default router;
