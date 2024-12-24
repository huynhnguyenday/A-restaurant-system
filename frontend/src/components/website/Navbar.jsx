import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Để điều hướng
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import NavbarLink from "./NavbarLink";
import SidebarCart from "./SidebarCart";
import SidebarMenu from "./SidebarMenu";
import SearchItem from "./SearchItem";
import Login from "./Login";

const Navbar = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setCartVisible] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const navigate = useNavigate(); // Hook để điều hướng

  const handleCartClick = () => {
    setCartVisible(!isCartVisible);
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Hàm cập nhật số lượng sản phẩm từ sessionStorage
  const updateTotalItems = () => {
    const tempCart = JSON.parse(sessionStorage.getItem("tempCart")) || [];
    setTotalItems(tempCart.length); // Đếm số lượng sản phẩm (sử dụng length)
  };

  // Sử dụng useEffect để cập nhật mỗi giây
  useEffect(() => {
    const interval = setInterval(() => {
      updateTotalItems();
    }, 1000); // Cập nhật mỗi 1 giây

    return () => clearInterval(interval); // Dọn dẹp khi component unmount
  }, []);

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
        <Login />
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
