// src/components/Navbar.js

import React, { useState } from "react";
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
import SidebarMenu from "./SidebarMenu"; // Import SidebarMenu
import imgfood1 from "../../../../backend/assets/imgfood1.png";
import imgfood2 from "../../../../backend/assets/imgfood2.png";
import imgfood3 from "../../../../backend/assets/imgfood3.png";
import imgfood4 from "../../../../backend/assets/imgfood4.png";
import imgfood5 from "../../../../backend/assets/imgfood5.png";
import imgfood6 from "../../../../backend/assets/imgfood6.png";

const Navbar = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Cà Phê", price: 50000, img: imgfood1, quantity: 2 },
    { id: 2, name: "Trà Sữa", price: 60000, img: imgfood2, quantity: 1 },
    {
      id: 3,
      name: "Sinh Tố Trân Châu Đường Đen",
      price: 40000,
      img: imgfood3,
      quantity: 1,
    },
    {
      id: 4,
      name: "Sinh Tố Trân Châu Đường Đen",
      price: 40000,
      img: imgfood4,
      quantity: 1,
    },
    {
      id: 5,
      name: "Sinh Tố Trân Châu Đường Đen",
      price: 40000,
      img: imgfood5,
      quantity: 1,
    },
    {
      id: 6,
      name: "Sinh Tố Trân Châu Đường Đen",
      price: 40000,
      img: imgfood6,
      quantity: 1,
    },
  ]);
  const [isCartVisible, setCartVisible] = useState(false);
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="relative z-10 flex items-center justify-between bg-white px-4 py-[35px] shadow-lg sm:px-8 md:px-16 lg:px-32">
      {/* Brand Name */}
      <div className="text-3xl font-bold pl-4 sm:pl-0 sm:text-4xl">
        <span className="text-black">Bamos</span>
        <span className="text-[#c63402]">Coffee</span>
      </div>

      {/* Navbar Links */}
      <div className="hidden flex-grow sm:flex">
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
          {cartItems.length > 0 && (
            <div className="absolute right-[-6px] top-[-6px] flex h-[17px] w-[17px] items-center justify-center rounded-full bg-[#ed4321] text-xs text-white">
              {cartItems.length}
            </div>
          )}
        </a>
      </div>

      <div className="flex item">
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
