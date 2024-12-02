import express from "express";
import {
  createAccount,
  getAccounts,
  updateAccount,
} from "../controllers/account.controller.js";

const router = express.Router();

router.get("/", getAccounts);
router.post("/", createAccount);
router.put("/:id", updateAccount);

export default router;
