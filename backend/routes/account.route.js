import express from "express";
import {
  createAccount,
  getAccountById,
  getAccounts,
  updateAccount,
} from "../controllers/account.controller.js";

const router = express.Router();

router.get("/", getAccounts);
router.get("/:id", getAccountById);
router.post("/", createAccount);
router.put("/:id", updateAccount);

export default router;