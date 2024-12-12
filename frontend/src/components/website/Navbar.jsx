import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import imgfood1 from "../../../../backend/assets/imgfood1.png";
import imgfood2 from "../../../../backend/assets/imgfood2.png";
import imgfood3 from "../../../../backend/assets/imgfood3.png";
import imgfood4 from "../../../../backend/assets/imgfood4.png";
import imgfood5 from "../../../../backend/assets/imgfood5.png";
import imgfood6 from "../../../../backend/assets/imgfood6.png";
import NavbarLink from "./NavbarLink";
import ModalLogin from "./ModalLogin";
import SidebarCart from "./SidebarCart";

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
        <NavbarLink />
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

      <ModalLogin
        isLoginModalVisible={isLoginModalVisible}
        onClose={handleLoginClose}
      />

      {/* Overlay */}
      {isCartVisible && (
        <div className="overlay" onClick={handleCartClick}></div>
      )}

      {/* Sidebar giỏ hàng */}
      {isCartVisible && (
        <SidebarCart
          cartItems={cartItems}
          removeItem={removeItem}
          totalPrice={totalPrice}
          handleCartClick={handleCartClick}
        />
      )}
    </nav>
  );
};

export default Navbar;