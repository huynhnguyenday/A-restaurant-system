import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import imgfood1 from "../assets/imgfood1.png";
import imgfood2 from "../assets/imgfood2.png";
import imgfood3 from "../assets/imgfood3.png";
import imgfood4 from "../assets/imgfood4.png";
import imgfood5 from "../assets/imgfood5.png";
import imgfood6 from "../assets/imgfood6.png";

const Navbar = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Cà Phê", price: 50000, img: imgfood1, quantity: 2 },
    { id: 2, name: "Trà Sữa", price: 60000, img: imgfood2, quantity: 1 },
    { id: 3, name: "Sinh Tố Trân Châu Đường Đen", price: 40000, img: imgfood3, quantity: 1 },
    { id: 4, name: "Sinh Tố Trân Châu Đường Đen", price: 40000, img: imgfood4, quantity: 1 },
    { id: 5, name: "Sinh Tố Trân Châu Đường Đen", price: 40000, img: imgfood5, quantity: 1 },
    { id: 6, name: "Sinh Tố Trân Châu Đường Đen", price: 40000, img: imgfood6, quantity: 1 },
]);
  const [isCartVisible, setCartVisible] = useState(false);  
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const [isLoginModalVisible, setLoginModalVisible] = useState(false); // Trạng thái hiển thị modal đăng nhập
  const [isRegisterMode, setRegisterMode] = useState(false);

  // Xử lý hiển thị/ẩn Popover tìm kiếm
  const handlePopoverEnter = () => setPopoverVisible(true);
  const handlePopoverLeave = () => setPopoverVisible(false);

  // Xử lý hiển thị/ẩn sidebar giỏ hàng
  const handleCartClick = () => {
    setCartVisible(!isCartVisible);
  };

  // Xử lý mở cửa sổ đăng nhập
  const handleLoginClick = () => {
    setLoginModalVisible(true);
  };

  // Xử lý đóng cửa sổ đăng nhập
  const handleLoginClose = () => {
    setLoginModalVisible(false);
  };

  // Chuyển sang chế độ đăng ký
  const handleSwitchToRegister = () => {
    setRegisterMode(true);
  };

  // Chuyển sang chế độ đăng nhập
  const handleSwitchToLogin = () => {
    setRegisterMode(false);
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="brand-name">
          <span className="brand-black">Bamos</span>
          <span className="brand-red">Coffee</span>
        </span>
      </div>

      <div className="navbar-center">
        <ul className="navbar-links">
          <li><a href="/home">TRANG CHỦ</a></li>
          <li><a href="/menu">THỰC ĐƠN</a></li>
          <li><a href="/news">TIN TỨC</a></li>
          <li><a href="/address">ĐỊA CHỈ</a></li>
        </ul>
      </div>

      <div className="navbar-right">
        {/* Tìm kiếm */}
        <div
          className="popover-container"
          onMouseEnter={handlePopoverEnter}
          onMouseLeave={handlePopoverLeave}
        >
          <button className="search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          {isPopoverVisible && (
            <div className="popover-content">
              <div className="search-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Tìm kiếm..."
                />
                <button className="icon-search">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Đăng nhập */}
        <a
          href="#login"
          className="login-icon"
          onClick={handleLoginClick} // Mở cửa sổ đăng nhập
        >
          <FontAwesomeIcon icon={faUser} />
        </a>

        {/* Giỏ hàng */}
        <a href="#cart" className="cart-icon" onClick={handleCartClick}>
          <FontAwesomeIcon icon={faShoppingCart} />
          {cartItems.length > 0 && (
            <div className="cart-badge">{cartItems.length}</div>
          )}
        </a>
      </div>

      {/* Modal Đăng nhập */}
      {isLoginModalVisible && (
        <div className="login-modal">
          <div className="modal-content">
            {/* Nút đóng */}
            <button className="close-modal" onClick={handleLoginClose}>
              <FontAwesomeIcon icon={faTimes} />
            </button>

            {isRegisterMode ? (
              // Modal Đăng ký
              <div>
                <h2 className="login-title">Đăng Ký</h2>
                <form>
                  <input type="text" placeholder="Tên đăng nhập" />
                  <input type="email" placeholder="Nhập Gmail" />
                  <input type="password" placeholder="Mật khẩu" />
                  <button type="submit" className="submit-login">Đăng Ký</button>
                </form>
                <div className="login-options">
                  <a href="#admin" className="register" onClick={handleSwitchToLogin}>
                    Đã có tài khoản?
                  </a>
                </div>
              </div>
            ) : (
              // Modal Đăng nhập
              <div>
                <h2 className="login-title">Đăng Nhập</h2>
                <form>
                  <input type="text" placeholder="Tên đăng nhập" />
                  <input type="password" placeholder="Mật khẩu" />
                  <button type="submit" className="submit-login"> <Link to="/admin">Đăng Nhập</Link> </button>
                </form>
                <div className="login-options">
                  <a href="#forgot-password" className="forgot-password">
                    Bạn quên mật khẩu?
                  </a>
                  <a href="#register" className="register" onClick={handleSwitchToRegister}>
                    Đăng ký
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Overlay */}
      {isCartVisible && <div className="overlay" onClick={handleCartClick}></div>}

      {/* Sidebar giỏ hàng */}
      {isCartVisible && (
        <div className="cart-sidebar">
          <button className="close-btn" onClick={handleCartClick}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="cart-title">Giỏ hàng</div>

          <div className="cart-divider"></div>

          <div className="cart-items">
            <div className="cart-items">
              {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                      <img src={item.img} alt={item.name} className="cart-item-img" />
                      <div className="cart-item-info">
                          <div className="cart-item-name">{item.name}</div>
                          <div className="cart-item-price">
                              {item.quantity} x {item.price.toLocaleString()} VNĐ 
                          </div>
                      </div>
                      <button className="remove-item-btn" onClick={() => removeItem(item.id)}>
                          <FontAwesomeIcon icon={faTimes} />
                      </button>
                  </div>
              ))}
            </div>
          </div>

          <div className="cart-total">
              <span>Tổng cộng</span>
              <span>
                  {cartItems.reduce((total, item) => total + item.quantity * item.price, 0).toLocaleString()} VNĐ
              </span>
          </div>
            <Link 
              to="/payment" 
              state={{ cartItems, totalPrice }}
            >
              <button className="checkout-btn" onClick={handleCartClick}>Thanh toán</button>
            </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;