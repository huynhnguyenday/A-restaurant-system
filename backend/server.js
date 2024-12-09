import express from "express";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import accountRoutes from "./routes/account.route.js";
import loginFormRoutes from "./routes/loginForm.route.js";
import categoryRoutes from "./routes/category.route.js";
import blogRoutes from "./routes/blog.route.js";
import mainPage from "./routes/mainPage.route.js";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json()); //allow accept json req.body
// Tạo biến tương đương __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cấu hình đường dẫn tĩnh cho folder assets
app.use("/assets", express.static(path.join(__dirname, "../backend/assets")));
app.use("/api/blogs", blogRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", loginFormRoutes);
app.use("/api/products", productRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/mainPages", mainPage);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  connectDB();
  console.log(`Server started on port ${port}...`);
});
