import express from "express";
import {
  getHotProducts,
  getProductById,
} from "../controllers/mainPage.controller.js";

const router = express.Router();

router.get("/:id", getProductById);
router.get("/", getHotProducts);

export default router;
