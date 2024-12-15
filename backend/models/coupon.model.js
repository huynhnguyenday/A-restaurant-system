import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    discountValue: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true } // Tự động tạo `createdAt` và `updatedAt`
);

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
