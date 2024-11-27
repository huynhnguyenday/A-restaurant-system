import express from "express";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

const app = express();

app.use(express.json()); //allow accept json req.body

app.use("/api/products", productRoutes);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  connectDB();
  console.log(`Server started on port ${port}...`);
});
