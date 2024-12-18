import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faUser,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import NavbarLink from "./NavbarLink";
import ModalLogin from "./ModalLogin";
import SidebarCart from "./SidebarCart";
import SidebarMenu from "./SidebarMenu";

const Navbar = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setCartVisible] = useState(false);
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lấy giỏ hàng từ sessionStorage khi load trang
  useEffect(() => {
    const getCartFromSession = () => {
      const tempCart = JSON.parse(sessionStorage.getItem("tempCart")) || [];
      setCartItems(tempCart);
    };

    // Đầu tiên lấy giỏ hàng khi load trang
    getCartFromSession();

    // Kiểm tra sự thay đổi trong sessionStorage định kỳ mỗi 1000ms
    const intervalId = setInterval(() => {
      getCartFromSession();
    }, 1000);

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handlePopoverEnter = () => setPopoverVisible(true);
  const handlePopoverLeave = () => setPopoverVisible(false);

  const handleCartClick = () => {
    setCartVisible(!isCartVisible);
  };

  const handleLoginClick = () => {
    setLoginModalVisible(true);
  };

  const handleLoginClose = () => {
    setLoginModalVisible(false);
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Tính tổng số loại sản phẩm trong giỏ hàng
  const totalItems = cartItems.length;

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-20 flex h-[90px] items-center justify-between bg-white px-4 py-4 shadow-lg sm:px-8 md:px-16 lg:px-32">
      {/* Brand Name */}
      <div className="pl-4 text-3xl font-bold sm:pl-0 sm:text-4xl">
        <span className="text-black">Bamos</span>
        <span className="text-[#c63402]">Coffee</span>
      </div>

      {/* Navbar Links */}
      <div className="hidden space-x-6 sm:flex">
        <NavbarLink />
      </div>

      {/* Search, Cart, and Login Icons */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div
          className="relative"
          onMouseEnter={handlePopoverEnter}
          onMouseLeave={handlePopoverLeave}
        >
          <button className="cursor-pointer text-2xl text-[#333] transition-all duration-300">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          {isPopoverVisible && (
            <div className="absolute right-[-7rem] top-[2rem] z-10 w-[260px] bg-white p-2 shadow-lg">
              <div className="flex items-center">
                <input
                  type="text"
                  className="flex-1 border border-gray-300 p-2"
                  placeholder="Tìm kiếm..."
                />
                <button className="bg-black p-2 text-white transition-all duration-300 hover:bg-gray-300 hover:text-black">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Login */}
        <a
          href="#login"
          className="cursor-pointer text-2xl text-[#333] transition-all duration-300 hover:text-[#d88453] lg:px-4"
          onClick={handleLoginClick}
        >
          <FontAwesomeIcon icon={faUser} />
        </a>

        {/* Cart */}
        <a
          href="#cart"
          className="relative cursor-pointer text-2xl text-[#333] transition-all duration-300 hover:text-[#d88453]"
          onClick={handleCartClick}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          {totalItems > 0 && (
            <div className="absolute right-[-6px] top-[-6px] flex h-[17px] w-[17px] items-center justify-center rounded-full bg-[#ed4321] text-xs text-white">
              {totalItems}
            </div>
          )}
        </a>
      </div>

      <div className="item flex">
        {/* Mobile Menu Toggle */}
        <div className="flex items-end text-[27px] sm:hidden">
          <button onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>

      {/* Sidebar Mobile Menu */}
      <SidebarMenu
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />

      <ModalLogin
        isLoginModalVisible={isLoginModalVisible}
        onClose={handleLoginClose}
      />

      {/* Overlay */}
      {isCartVisible && (
        <div
          className="fixed left-0 top-0 z-50 h-full w-full bg-black bg-opacity-50"
          onClick={handleCartClick}
        ></div>
      )}

      {/* Sidebar Cart */}
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
