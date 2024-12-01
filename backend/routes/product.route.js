import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import multer from "multer"

// Cấu hình multer (đã trình bày ở trên)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/assets"); // Lưu ảnh vào thư mục backend/assets
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage }); // Tạo middleware upload
const router = express.Router();

router.get("/", upload.single("image"), getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
