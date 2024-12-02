import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Address from "./components/Address";
import DetailFood from "./components/DetailFood";
import Newsletter from "./components/Newsletter";
import DetailBlog from "./components/DetailBlog";
import BlogMain from "./components/BlogMain";
import News from "./components/News";
import PaymentPage from "./components/PaymentPage";
import Admin from "./components/Admin";
import "./app.css";

// Layout chung có Navbar và Footer
const MainLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Navbar />
      {children}
      <Newsletter />
      <Footer />
    </div>
  );
};

// Layout dành riêng cho Admin không có Navbar và Footer
const AdminLayout = ({ children }) => {
  return <div className="admin-container">{children}</div>;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route cho các trang chung có Navbar và Footer */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/menu" element={<MainLayout><Menu /></MainLayout>} />
        <Route path="/news" element={<MainLayout><News /></MainLayout>} />
        <Route path="/address" element={<MainLayout><Address /></MainLayout>} />
        <Route path="/detailfood/:id" element={<MainLayout><DetailFood /></MainLayout>} />
        <Route path="/blogs" element={<MainLayout><BlogMain /></MainLayout>} />
        <Route path="/blogs/:id" element={<MainLayout><DetailBlog /></MainLayout>} />
        <Route path="/payment" element={<MainLayout><PaymentPage /></MainLayout>} />

        {/* Route cho Admin, không có Navbar và Footer */}
        <Route path="/admin" element={<AdminLayout><Admin /></AdminLayout>} />

        {/* Route cho các trang khác */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;