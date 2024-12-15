import Order from "../models/order.model.js"; // Import schema Order

// API để xử lý đơn hàng thanh toán
export const createOrder = async (req, res) => {
  try {
    // Nhận dữ liệu từ body gửi lên
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

    // Kiểm tra dữ liệu đầu vào
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

    // Tạo đơn hàng mới
    const newOrder = new Order({
      name,
      address,
      number,
      email,
      note,
      paymentMethod,
      discount: discount || 0,
      finalPrice,
      cart,
    });

    // Lưu đơn hàng vào MongoDB
    await newOrder.save();

    // Phản hồi thành công
    res.status(201).json({
      message: "Đơn hàng đã được tạo thành công!",
      order: newOrder,
    });
  } catch (error) {
    console.error("Lỗi tạo đơn hàng:", error);
    res.status(500).json({ message: "Lỗi server khi tạo đơn hàng!" });
  }
};
