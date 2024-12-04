import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChartColumn,
  faBars,
  faMugSaucer,
  faNewspaper,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import ManageProduct from "./ProductManage/ManageProduct";
import ManageBlog from "./ManageBlog";
import ManageAccount from "./AccountManage/ManageAccount";
import ManageCategory from "./CategoryManage/ManageCategory";
import { Link } from "react-router-dom";
import imgpersonportal from "../../assets/imgpersonportal.png";

const SidebarItem = ({ icon, label, isSidebarExpanded, onClick, isActive }) => (
  <li
    className={`flex cursor-pointer items-center px-4 py-6 ${
      isActive
        ? "ml-2 mr-2 flex items-center justify-center rounded-2xl bg-black text-white"
        : "hover:bg-gray-100"
    }`}
    onClick={onClick}
  >
    <FontAwesomeIcon icon={icon} className="text-2xl" />
    <span
      className={`ml-4 ${!isSidebarExpanded && "hidden group-hover:block"}`}
    >
      {label}
    </span>
  </li>
);

const DashBoard = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [activeComponent, setActiveComponent] = useState("Home");
  const [isHovered, setIsHovered] = useState(false); // Trạng thái hover

  const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);

  const renderContent = () => {
    switch (activeComponent) {
      case "Home":
        return <ManageAccount />;
      case "Product":
        return <ManageProduct />;
      case "Category":
        return <ManageCategory />
      case "Blog":
        return <ManageBlog />;
      case "Settings":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold">Settings</h2>
            <p>Configure your application preferences here.</p>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <p>Select an option from the sidebar.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`group bg-white text-gray-800 ${
          isSidebarExpanded ? "w-64" : "w-16"
        } fixed h-screen transition-all duration-300 hover:w-64`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-4">
          <span
            className={`text-lg font-bold ${
              !isSidebarExpanded && "hidden group-hover:block"
            }`}
          >
            Bamos<span className="admin-name-app text-orange-900">Coffee</span>
          </span>
          <button
            onClick={toggleSidebar}
            className="px-1 text-gray-400 hover:text-black focus:outline-none"
          >
            <FontAwesomeIcon icon={faBars} className="text-2xl" />
          </button>
        </div>

        {/* Sidebar Menu */}
        <ul className="mt-4">
          <SidebarItem
            icon={faUser}
            label="Account"
            isSidebarExpanded={isSidebarExpanded}
            onClick={() => setActiveComponent("Home")}
            isActive={activeComponent === "Home"}
          />
          <SidebarItem
            icon={faMugSaucer}
            label="Product"
            isSidebarExpanded={isSidebarExpanded}
            onClick={() => setActiveComponent("Product")}
            isActive={activeComponent === "Product"}
          />
          <SidebarItem
            icon={faBars} // Thay bằng icon phù hợp
            label="Category"
            isSidebarExpanded={isSidebarExpanded}
            onClick={() => setActiveComponent("Category")}
            isActive={activeComponent === "Category"}
          />
          <SidebarItem
            icon={faNewspaper}
            label="Blog"
            isSidebarExpanded={isSidebarExpanded}
            onClick={() => setActiveComponent("Blog")}
            isActive={activeComponent === "Blog"}
          />
          <SidebarItem
            icon={faChartColumn}
            label="Chart"
            isSidebarExpanded={isSidebarExpanded}
            onClick={() => setActiveComponent("Settings")}
            isActive={activeComponent === "Settings"}
          />
        </ul>
      </div>

      {/* Main Content */}
      <div
        className={`flex flex-1 flex-col ${
          isSidebarExpanded ? "ml-64" : "ml-16"
        } transition-all duration-300`}
      >
        {/* Navbar */}
        <div className="flex justify-between bg-white p-4 shadow-md">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          {/* Nút với trạng thái hover */}
          <div
            className="relative pr-8"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Link to="/">
              {isHovered ? (
                <img
                  src={imgpersonportal}
                  alt="Person Portal"
                  className="h-8 w-8 cursor-pointer"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faRightToBracket}
                  className="cursor-pointer text-3xl"
                />
              )}
            </Link>
            {isHovered && (
              <span className="absolute -left-4 mt-2 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 px-4 py-2 text-sm text-white shadow-lg">
                Go To HomePage
              </span>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
