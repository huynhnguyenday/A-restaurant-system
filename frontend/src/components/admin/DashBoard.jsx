import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChartColumn,
  faBars,
  faMugSaucer,
  faNewspaper,
  faRightToBracket,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import ManageProduct from "./ProductManage/ManageProduct";
import ManageBlog from "./BlogManage/ManageBlog";
import ManageAccount from "./AccountManage/ManageAccount";
import ManageCategory from "./CategoryManage/ManageCategory";
import { Link } from "react-router-dom";
import imgpersonportal from "../../../../backend/assets/imgpersonportal.png";
import Cookies from "js-cookie";

function decodeJWT(token) {
  const base64Url = token.split(".")[1]; // Lấy phần payload
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Đổi ký tự '-' và '_' về '+', '/'
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );

  return JSON.parse(jsonPayload); // Trả về đối tượng JSON đã giải mã
}

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
  const [activeComponent, setActiveComponent] = useState("Account");
  const [isHovered, setIsHovered] = useState(false);
  const [userRole, setUserRole] = useState(null); // Trạng thái role của người dùng

  // Đọc giá trị activeComponent từ localStorage khi trang được tải lại
  useEffect(() => {
    const token = Cookies.get("jwtToken"); // Lấy token từ cookie
    if (token) {
      try {
        const decoded = decodeJWT(token);
        console.log("Decoded token:", decoded); // In thông tin decoded
        setUserRole(decoded ? decoded.role : null); // Lưu role từ token
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, []);

  // Lưu giá trị activeComponent vào localStorage khi thay đổi
  const handleSetActiveComponent = (component) => {
    setActiveComponent(component);
    localStorage.setItem("activeComponent", component); // Lưu vào localStorage
  };

  const renderContent = () => {
    if (userRole && userRole.includes("customer")) {
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold">Access Denied</h2>
          <p>You do not have permission to access this page.</p>
        </div>
      );
    }

    switch (activeComponent) {
      case "Account":
        return userRole && userRole.includes("admin") ? (
          <ManageAccount />
        ) : null;
      case "Product":
        return <ManageProduct />;
      case "Category":
        return <ManageCategory />;
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
      {" "}
      1{/* Sidebar */}
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
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            className="px-1 text-gray-400 hover:text-black focus:outline-none"
          >
            <FontAwesomeIcon icon={faBars} className="text-2xl" />
          </button>
        </div>

        {/* Sidebar Menu */}
        <ul className="mt-4">
          {Array.isArray(userRole) && userRole.includes("admin") && (
            <SidebarItem
              icon={faUser}
              label="Account"
              isSidebarExpanded={isSidebarExpanded}
              onClick={() => handleSetActiveComponent("Account")}
              isActive={activeComponent === "Account"}
            />
          )}
          <SidebarItem
            icon={faMugSaucer}
            label="Product"
            isSidebarExpanded={isSidebarExpanded}
            onClick={() => handleSetActiveComponent("Product")}
            isActive={activeComponent === "Product"}
          />
          <SidebarItem
            icon={faClipboardList}
            label="Category"
            isSidebarExpanded={isSidebarExpanded}
            onClick={() => handleSetActiveComponent("Category")}
            isActive={activeComponent === "Category"}
          />
          <SidebarItem
            icon={faNewspaper}
            label="Blog"
            isSidebarExpanded={isSidebarExpanded}
            onClick={() => handleSetActiveComponent("Blog")}
            isActive={activeComponent === "Blog"}
          />
          {userRole === "admin" && (
            <SidebarItem
              icon={faChartColumn}
              label="Chart"
              isSidebarExpanded={isSidebarExpanded}
              onClick={() => handleSetActiveComponent("Settings")}
              isActive={activeComponent === "Settings"}
            />
          )}
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

        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
