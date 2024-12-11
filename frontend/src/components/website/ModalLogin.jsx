import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const ModalLogin = ({ isLoginModalVisible, onClose }) => {
  const [isRegisterMode, setRegisterMode] = useState(false);

  // Xử lý chuyển đổi giữa đăng nhập và đăng ký
  const toggleMode = (e, mode) => {
    e.preventDefault();
    setRegisterMode(mode);
  };

  if (!isLoginModalVisible) return null;

  return (
    <div className="login-modal">
      <div className="modal-content">
        {/* Nút đóng */}
        <button className="close-modal" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {isRegisterMode ? (
          <div>
            <h2 className="login-title">Đăng Ký</h2>
            <form>
              <input type="text" placeholder="Tên đăng nhập" required />
              <input type="email" placeholder="Nhập Gmail" required />
              <input type="password" placeholder="Mật khẩu" required />
              <button type="submit" className="submit-login">
                Đăng Ký
              </button>
            </form>
            <div className="login-options">
              <a
                href="#login"
                className="switch-mode"
                onClick={(e) => toggleMode(e, false)}
              >
                Đã có tài khoản?
              </a>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="login-title">Đăng Nhập</h2>
            <form>
              <input type="text" placeholder="Tên đăng nhập" required />
              <input type="password" placeholder="Mật khẩu" required />
              <button type="submit" className="submit-login">
                <Link to="/admin">Đăng Nhập</Link>
              </button>
            </form>
            <div className="login-options">
              <a href="#forgot-password" className="forgot-password">
                Bạn quên mật khẩu?
              </a>
              <a
                href="#register"
                className="switch-mode"
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
