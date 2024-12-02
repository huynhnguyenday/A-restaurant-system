// models/account.model.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const accountSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true, // Đảm bảo không trùng username
    },
    password: {
      type: String,
      required: true,
    },
    numbers: {
      type: Number,
      required: true,
    },
    gmail: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true, // Mặc định là active
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "staff", "customer"], // Liệt kê các giá trị có thể
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

accountSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

accountSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Account = mongoose.model("Account", accountSchema);

export default Account;
