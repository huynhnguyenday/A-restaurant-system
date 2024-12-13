import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import imgdropdown1 from "../../../../backend/assets/imgdropdown1.png";
import imgdropdown2 from "../../../../backend/assets/imgdropdown2.png";
import imgdropdown3 from "../../../../backend/assets/imgdropdown3.png";

const PricingContentMenu = ({ closeFlyout }) => {
  const [categories, setCategories] = useState([]); // Default categories
  const navigate = useNavigate();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/mainPages/activeCategories",
        );
        const categoryData = response.data.data.map(
          (category) => category.name,
        );
        setCategories(categoryData); // Set fetched categories
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleNavigate = (category) => {
    closeFlyout();
    navigate(`/menu?category=${category}`);
  };

  const handleNavigateToMenu = () => {
    closeFlyout();
    navigate("/menu");
  };

  return (
    <div className="flex h-[480px] w-[1200px] bg-white shadow-xl">
      <div className="w-[400px] bg-[#2385a3] p-6 pr-4">
        <div className="mb-3 space-y-3">
          <h3 className="pb-4 text-3xl font-bold text-white">THỰC ĐƠN</h3>
          <div className="space-y-4 pb-4">
            {categories.map((category) => (
              <a
                key={category}
                onClick={() => handleNavigate(category)}
                className="mr-4 block cursor-pointer border-b-[1px] border-white border-opacity-30 pl-2 !font-josefin text-base !text-white hover:!text-slate-400"
              >
                + {category}
              </a>
            ))}
          </div>
        </div>
        <button
          onClick={handleNavigateToMenu}
          className="w-1/2 rounded-lg border-2 border-[#d88453] bg-[#d88453] px-4 py-2 font-semibold text-white transition-colors hover:rounded-3xl hover:border-[#103e4c] hover:bg-[#103e4c]"
        >
          Xem menu
        </button>
      </div>

      <div className="flex w-full flex-col">
        {/* Tiêu đề mới */}
        <div className="w-full py-4 pl-6 text-start">
          <h2 className="text-2xl font-bold text-[#633c02]">
            Trend mới thử ngay!
          </h2>
        </div>

        <div className="flex pl-6">
          {/* Item 1 */}
          <div className="w-1/3 text-start">
            <div className="overflow-hidden">
              <img
                src={imgdropdown2}
                alt="imgdropdown1"
                className="h-[200px] w-full object-cover"
              />
            </div>
            <h3 className="mt-2 pt-2 text-2xl font-bold text-orange-700">
              Trà sữa nung
            </h3>
            <p className="mt-1 h-[60px] font-josefin text-base text-gray-600">
              Hòa quyện giữa trà sữa và các hương liệu, nung nóng tạo hương vị
              đặc biệt.
            </p>
            <button
              className="mt-2 pt-4 font-josefin text-xl font-semibold text-orange-700 hover:text-orange-900"
              onClick={handleNavigateToMenu}
            >
              Xem thêm
            </button>
          </div>

          {/* Item 2 */}
          <div className="w-1/3 px-4 text-start">
            <div className="overflow-hidden">
              <img
                src={imgdropdown3}
                alt="imgdropdown2"
                className="h-[200px] w-full object-cover"
              />
            </div>
            <h3 className="mt-2 pt-2 text-2xl font-bold text-orange-700">
              Trà Chanh Giã Tay
            </h3>
            <p className="mt-1 h-[60px] font-josefin text-base text-gray-600">
              Hương vị Chanh nước hoa thơm ngát kết hợp với trà tạo hương vị
              tinh tế và độc đáo.
            </p>
            <button
              className="mt-2 pt-4 font-josefin text-xl font-semibold text-orange-700 hover:text-orange-900"
              onClick={handleNavigateToMenu}
            >
              Xem thêm
            </button>
          </div>

          {/* Item 3 */}
          <div className="w-1/3 px-4 text-start">
            <div className="overflow-hidden">
              <img
                src={imgdropdown1}
                alt="imgdropdown3"
                className="h-[200px] w-full object-cover"
              />
            </div>
            <h3 className="mt-2 pt-2 text-2xl font-bold text-orange-700">
              Trà Mãng Cầu
            </h3>
            <p className="mt-1 h-[60px] font-josefin text-base text-gray-600">
              Kết hợp hương vị ngọt ngào của mãng cầu mang đến sự tươi mới và
              hấp dẫn
            </p>
            <button
              className="mt-2 pt-4 font-josefin text-xl font-semibold text-orange-700 hover:text-orange-900"
              onClick={handleNavigateToMenu}
            >
              Xem thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingContentMenu;
