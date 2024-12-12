import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ModalLogin = ({ isLoginModalVisible, onClose }) => {
  const [isRegisterMode, setRegisterMode] = useState(false);

  // Xử lý chuyển đổi giữa đăng nhập và đăng ký
  const toggleMode = (e, mode) => {
    e.preventDefault();
    setRegisterMode(mode);
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
              <button
                type="submit"
                className="w-full rounded bg-black py-2 text-white hover:bg-gray-600"
              >
                Đăng Ký
              </button>
            </form>
            <div className="mt-4">
              <a
                href="#login"
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
            <form>
              <input
                type="text"
                placeholder="Tên đăng nhập"
                required
                className="mb-4 w-full rounded border border-gray-300 p-2"
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                required
                className="mb-4 w-full rounded border border-gray-300 p-2"
              />
              <button
                type="submit"
                className="w-full rounded bg-black py-2 text-white hover:bg-gray-600"
              >
                <Link to="/admin">Đăng Nhập</Link>
              </button>
            </form>
            <div className="mt-4 flex justify-between">
              <a
                href="#forgot-password"
                className="text-lg text-gray-500 hover:text-black"
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalLogin;
