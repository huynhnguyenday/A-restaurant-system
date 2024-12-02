import React from "react";
import "./MainSlider.css"; // CSS để định dạng giao diện
import imgBackground from "../assets/img_background.png"; // Đường dẫn tới ảnh

const MainSlider = () => {
  return (
    <div className="main-slider">
      <div className="content">
        <h4>Áp dụng cho học sinh sinh viên</h4>
        <h1 className="animated-title">
          Hè đến - Giảm giá 30%
        </h1>
        <button className="btn-buy">Mua ngay</button>
      </div>
      <div className="image-container">
        <img src={imgBackground} alt="Background" className="background-image" />
      </div>
    </div>
  );
};

export default MainSlider;
