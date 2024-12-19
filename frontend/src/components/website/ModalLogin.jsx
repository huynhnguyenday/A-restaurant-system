import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import ModalForgotPassword from "./ModalForgotPassword";

const ModalLogin = ({ isLoginModalVisible, onClose }) => {
  const [isRegisterMode, setRegisterMode] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [isForgotPasswordVisible, setForgotPasswordVisible] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        },
        { withCredentials: true },
      );

      if (response.data.success) {
        // Đăng nhập thành công
        toast.success("Đăng nhập thành công!");
        
        // Lưu token vào Local Storage
        const token = response.data.token;
        console.log("Extracted token:", token);

        if (token) {
          // Lưu token vào cookies (cookie sẽ hết hạn sau 7 ngày)
          Cookies.set("jwtToken", token, { expires: 7, path: "/" });
          console.log("JWT Token saved to cookies:", Cookies.get("jwtToken"));
        } else {
          console.error("Token not received from server.");
        }

        // Đóng modal
        onClose();

        // Điều hướng đến trang admin
        navigate("/admin");
      }
    } catch (error) {
      // Xử lý lỗi
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    }
  };

  // Xử lý chuyển đổi giữa đăng nhập và đăng ký
  const toggleMode = (e, mode) => {
    e.preventDefault();
    setRegisterMode(mode);
    setErrorMessage(""); // Xóa thông báo lỗi khi chuyển chế độ
  };

  if (!isLoginModalVisible) return null;

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-96 rounded-lg bg-white p-8 text-center shadow-lg">
        {/* Nút đóng */}
        <button
          className="absolute right-4 top-2 cursor-pointer border-none bg-none text-3xl text-gray-400 hover:text-black"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        
        {isRegisterMode ? (
          <div>
            <h2 className="mb-4 text-3xl font-bold">Đăng Ký</h2>
            <form>
              <input
                type="text"
                placeholder="Tên đăng nhập"
                required
                className="mb-4 w-full rounded border border-gray-300 p-2"
              />
              <input
                type="email"
                placeholder="Nhập Gmail"
                required
                className="mb-4 w-full rounded border border-gray-300 p-2"
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                required
                className="mb-4 w-full rounded border border-gray-300 p-2"
              />
              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                required
                className="mb-4 w-full rounded border border-gray-300 p-2"
              />
              <button
                type="submit"
                className="w-full rounded bg-black py-2 text-white hover:bg-gray-600"
              >
                Đăng Ký
              </button>
            </form>
            <div className="mt-4">
              <a
                href="/admin"
                className="text-gray-500 hover:text-black"
                onClick={(e) => toggleMode(e, false)}
              >
                Đã có tài khoản?
              </a>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="mb-4 w-full text-3xl font-bold">Đăng Nhập</h2>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mb-4 w-full rounded border border-gray-300 p-2"
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mb-4 w-full rounded border border-gray-300 p-2"
              />
              {errorMessage && (
                <p className="mb-4 text-red-500">{errorMessage}</p>
              )}
              <button
                type="submit"
                className="w-full rounded bg-black py-2 text-white hover:bg-gray-600"
              >
                Đăng Nhập
              </button>
            </form>
            <div className="mt-4 flex justify-between">
              <a
                href="#forgot-password"
                className="text-lg text-gray-500 hover:text-black"
                onClick={(e) => {
                  e.preventDefault();
                  setForgotPasswordVisible(true);
                }}
              >
                Bạn quên mật khẩu?
              </a>
              <a
                href="#register"
                className="text-lg text-gray-500 hover:text-black"
                onClick={(e) => toggleMode(e, true)}
              >
                Đăng ký
              </a>
            </div>

            <ModalForgotPassword
              isVisible={isForgotPasswordVisible}
              onClose={() => setForgotPasswordVisible(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalLogin;
