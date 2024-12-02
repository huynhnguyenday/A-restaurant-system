import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProduct = async (req, res) => {
  try {
    // Lấy tất cả sản phẩm từ database
    const products = await Product.find({});

    // Thêm đường dẫn đầy đủ cho ảnh
    const productsWithFullImagePath = products.map((product) => {
      return {
        ...product.toObject(), // Lấy tất cả thông tin sản phẩm
        image: `http://localhost:5000/assets/${product.image}`, // Thêm đường dẫn ảnh đầy đủ
      };
    });

    // Trả về danh sách sản phẩm với đường dẫn ảnh đầy đủ
    res.status(200).json({ success: true, data: productsWithFullImagePath });
  } catch (error) {
    console.error("Error in fetching products: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const createProduct = async (req, res) => {
  const product = req.body;

  if (
    !product.name ||
    !product.image ||
    !product.sell_price ||
    !product.price
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all field" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(200).json({ success: true, data: newProduct });
  } catch (error) {
    console.log("Error in creating product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product ID" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product ID" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error in deleting products: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
