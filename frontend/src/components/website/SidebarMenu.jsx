import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import NavbarLink from "./NavbarLink";

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
        className={`fixed left-0 top-0 z-50 h-full w-64 bg-white shadow-lg sm:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faTimes} size="xl" />
          </button>
        </div>
        <div className="flex flex-col space-y-4 p-4">
          {/* Make the links stack vertically with space between them */}
          <NavbarLink />
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
