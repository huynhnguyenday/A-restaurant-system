import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Để điều hướng
import Cookies from "js-cookie"; // Import thư viện cookies
import { decodeJWT } from "../utils/jwtUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import NavbarLink from "./NavbarLink";
import SidebarCart from "./SidebarCart";
import SidebarMenu from "./SidebarMenu";
import SearchItem from "./SearchItem";

const Navbar = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setCartVisible] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate(); // Hook để điều hướng

  // Hàm xử lý khi nhấn vào nút Login
  const handleLoginClick = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
    const token = Cookies.get("jwtToken"); // Lấy JWT token từ cookies
    if (token) {
      try {
        const decoded = decodeJWT(token); // Giải mã token
        // Điều hướng dựa trên vai trò người dùng
        if (decoded.role.includes("admin") || decoded.role.includes("staff")) {
          navigate("/admin");
        } else if (decoded.role.includes("customer")) {
          navigate("/customerprofile");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      // Nếu không có token, điều hướng đến trang login
      navigate("/login");
    }
  };

  const handleCartClick = () => {
    setCartVisible(!isCartVisible);
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-20 flex h-[90px] items-center justify-between bg-white px-4 py-4 shadow-lg sm:px-8 md:px-16 lg:px-32">
      <a href="/home" className="pl-4 text-3xl font-bold sm:pl-0 sm:text-4xl">
        <span className="text-black">Bamos</span>
        <span className="text-[#c63402]">Coffee</span>
      </a>
      <div className="hidden space-x-6 sm:flex">
        <NavbarLink />
      </div>
      <div className="flex items-center space-x-4">
        <SearchItem />
        <a
          href="/login"
          onClick={handleLoginClick} // Gắn sự kiện click
          className="cursor-pointer text-2xl text-[#333] transition-all duration-300 hover:text-[#d88453] lg:px-4"
        >
          <FontAwesomeIcon icon={faUser} />
        </a>
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
        <div className="flex items-end text-[27px] sm:hidden">
          <button onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
      <SidebarMenu
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      {isCartVisible && (
        <div
          className="fixed left-0 top-0 z-50 h-full w-full bg-black bg-opacity-50"
          onClick={handleCartClick}
        ></div>
      )}
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
