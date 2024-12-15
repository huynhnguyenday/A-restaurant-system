import Coupon from "../models/coupon.model.js";

// Tạo một coupon mới
export const createCoupon = async (req, res) => {
  try {
    const { code, discountValue } = req.body;

    // Kiểm tra xem mã coupon đã tồn tại chưa
    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({ message: "Mã giảm giá đã tồn tại!" });
    }

    // Tạo coupon mới
    const coupon = new Coupon({
      code,
      discountValue,
    });

    await coupon.save();

    res.status(201).json({
      message: "Coupon đã được tạo thành công!",
      data: coupon,
    });
  } catch (error) {
    console.error("Lỗi tạo coupon:", error);
    res.status(500).json({ message: "Lỗi server khi tạo coupon!" });
  }
};

// Lấy tất cả các coupon
export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find(); // Lấy tất cả coupons
    res.status(200).json({ data: coupons });
  } catch (error) {
    console.error("Lỗi lấy danh sách coupon:", error);
    res.status(500).json({ message: "Lỗi server khi lấy danh sách coupon!" });
  }
};

// Lấy một coupon theo mã code
export const getCouponById = async (req, res) => {
  try {
    const couponId = req.params.id; // Nhận couponId từ tham số trong URL

    // Kiểm tra xem couponId có phải là ObjectId hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(couponId)) {
      return res.status(400).json({ message: "Mã coupon không hợp lệ!" });
    }

    // Tìm coupon theo ObjectId
    const coupon = await Coupon.findById(couponId);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon không tìm thấy!" });
    }

    // Trả về coupon
    res.status(200).json({ data: coupon });
  } catch (error) {
    console.error("Lỗi khi lấy coupon:", error);
    res.status(500).json({ message: "Lỗi server khi lấy coupon!" });
  }
};

// Cập nhật coupon theo code
export const updateCoupon = async (req, res) => {
  const { id } = req.params; // Lấy id từ params
  const { code, discountValue } = req.body; // Lấy code và discountValue từ body

  // Kiểm tra xem id có hợp lệ không
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Coupon ID" });
  }

  // Kiểm tra xem code và discountValue có được cung cấp không
  if (!code || !discountValue) {
    return res.status(400).json({
      success: false,
      message: "Cần cung cấp cả code và discountValue",
    });
  }

  try {
    // Tìm coupon theo ID
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      id,
      { code, discountValue },
      { new: true }
    );

    // Kiểm tra xem coupon có tồn tại không
    if (!updatedCoupon) {
      return res
        .status(404)
        .json({ success: false, message: "Coupon không tìm thấy" });
    }

    // Trả về coupon đã được cập nhật
    res.status(200).json({ success: true, data: updatedCoupon });
  } catch (error) {
    console.error("Lỗi khi cập nhật coupon: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Xóa coupon theo mã code
export const deleteCoupon = async (req, res) => {
  try {
    const couponId = req.params.id; // Nhận couponId từ tham số trong URL

    if (!mongoose.Types.ObjectId.isValid(couponId)) {
      return res.status(400).json({ message: "Mã coupon không hợp lệ!" });
    }

    // Xóa coupon theo ObjectId
    const deletedCoupon = await Coupon.findByIdAndDelete(couponId);
    if (!deletedCoupon) {
      return res.status(404).json({ message: "Coupon không tìm thấy!" });
    }

    // Trả về thông báo thành công
    res.status(200).json({ message: "Coupon đã được xóa thành công!" });
  } catch (error) {
    console.error("Lỗi khi xóa coupon:", error);
    res.status(500).json({ message: "Lỗi server khi xóa coupon!" });
  }
};
