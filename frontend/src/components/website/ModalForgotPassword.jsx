import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const ModalForgotPassword = ({ isVisible, onClose }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        {
          email,
        },
      );

      if (response.data.success) {
        toast.success("Yêu cầu khôi phục mật khẩu đã được gửi!");
        setMessage("Hãy kiểm tra email của bạn để đặt lại mật khẩu.");
      } else {
        toast.error("Đã xảy ra lỗi.");
        setMessage("Không thể gửi yêu cầu. Vui lòng thử lại.");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi.");
      setMessage("Không thể gửi yêu cầu. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-3xl h-96 rounded-lg bg-white p-8 text-center shadow-lg">
        <button
          className="absolute right-4 top-2 cursor-pointer border-none bg-none text-3xl text-gray-400 hover:text-black"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <h2 className="mb-4 text-3xl font-bold">Quên Mật Khẩu</h2>
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-4 w-full rounded border border-gray-300 p-2"
          />
          <button
            type="submit"
            className="w-full rounded bg-black py-2 text-white hover:bg-gray-600"
            disabled={isLoading}
          >
            {isLoading ? "Đang gửi..." : "Gửi yêu cầu"}
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-gray-500">{message}</p>}
      </div>
    </div>
  );
};

export default ModalForgotPassword;
