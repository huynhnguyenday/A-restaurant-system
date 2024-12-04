import express from "express";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import accountRoutes from "./routes/account.route.js";
import loginFormRoutes from "./routes/loginForm.route.js";
import categoryRoutes from "./routes/category.route.js";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json()); //allow accept json req.body

app.use("/assets", express.static(path.join(path.resolve(), "backend/assets")));

app.use("/api/categories", categoryRoutes);
app.use("/api/users", loginFormRoutes);
app.use("/api/products", productRoutes);
app.use("/api/accounts", accountRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  connectDB();
  console.log(`Server started on port ${port}...`);
});
