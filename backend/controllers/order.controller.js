import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import { ObjectId } from "mongodb";
// API để xử lý đơn hàng thanh toán
export const createOrder = async (req, res) => {
  try {
    const {
      name,
      address,
      number,
      email,
      note,
      paymentMethod,
      discount,
      finalPrice,
      cart,
    } = req.body;

    if (
      !name ||
      !address ||
      !number ||
      !email ||
      !paymentMethod ||
      !finalPrice ||
      !cart
    ) {
      return res.status(400).json({ message: "Thiếu thông tin cần thiết!" });
    }

    console.log("Received order data:", req.body);

    const updatedCart = await Promise.all(
      cart.map(async (item) => {
        const productId = new ObjectId(item.productId); // Dùng new ObjectId
        const product = await Product.findById(productId);
        if (!product) {
          console.error(`Product with ID ${item.productId} not found`);
          throw new Error("Sản phẩm không tồn tại");
        }
        return {
          product: product._id,
          quantity: item.quantity,
          totalPrice: item.quantity * item.price,
        };
      })
    );

    const newOrder = new Order({
      name,
      address,
      number,
      email,
      note,
      paymentMethod,
      discount: discount || 0,
      finalPrice,
      cart: updatedCart,
    });

    await newOrder.save();

    res.status(201).json({
      message: "Đơn hàng đã được tạo thành công!",
      order: newOrder,
    });
  } catch (error) {
    console.error("Lỗi tạo đơn hàng:", error);
    res.status(500).json({ message: "Lỗi server khi tạo đơn hàng!" });
  }
};
