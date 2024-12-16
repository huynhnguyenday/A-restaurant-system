import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import NavbarLink from "./NavbarLink";
import { faFacebookF, faInstagram, faTiktok, faTwitter } from "@fortawesome/free-brands-svg-icons";

const SidebarMenu = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  return (
    <div>
      {/* Overlay div */}
      <div
        className={`fixed bottom-0 left-0 right-0 top-0 z-40 bg-black opacity-50 sm:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
        onClick={toggleMobileMenu} // Close the menu when clicking on the overlay
      ></div>

      {/* Sidebar Menu */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-72 bg-white shadow-lg sm:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex">
          <div className="pl-4 pt-9 text-4xl font-bold">
            <span className="text-black">Bamos</span>
            <span className="text-[#c63402]">Coffee</span>
          </div>

          <div className="flex justify-end pb-8 pl-3">
            <button onClick={toggleMobileMenu}>
              <FontAwesomeIcon icon={faTimes} size="2xl" />
            </button>
          </div>
        </div>
        <div className="flex flex-col pt-10">
          {/* Make the links stack vertically with space between them */}
          <ul className="navbar-links items-start justify-center sm:flex-row sm:space-x-8 sm:py-4">
            <li className="w-full border-t-[1px] border-gray-300 py-3 sm:border-none sm:py-0">
              <p className="pl-8 font-josefin text-2xl font-bold">
                Gọi đặt bàn
              </p>
              <p className="pl-8 font-josefin text-base font-bold">
                0907-767-360
              </p>
            </li>
          </ul>
          <NavbarLink />
          <div className="flex flex-row px-1 py-6">
            <a className="flex h-[45px] mx-2 w-[45px] items-center justify-center rounded-full bg-blue-900 text-2xl text-white transition-transform duration-300 ease-in-out hover:scale-110 hover:text-[#d88453]">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a className="flex h-[45px] mx-2 w-[45px] items-center justify-center rounded-full bg-black text-2xl text-white transition-transform duration-300 ease-in-out hover:scale-110 hover:text-[#d88453]">
              <FontAwesomeIcon icon={faTiktok} />
            </a>
            <a className="flex h-[45px] mx-2 w-[45px] items-center justify-center rounded-full bg-red-500 text-2xl font-bold text-white transition-transform duration-300 ease-in-out hover:scale-110 hover:text-[#d88453]">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a className="flex h-[45px] mx-2 w-[45px] items-center justify-center rounded-full bg-blue-600 text-2xl text-white transition-transform duration-300 ease-in-out hover:scale-110 hover:text-[#d88453]">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
