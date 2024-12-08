import React from "react";
import { useNavigate } from "react-router-dom";
import imgdropdown1 from "../../../../backend/assets/imgdropdown1.png";
import imgdropdown2 from "../../../../backend/assets/imgdropdown2.png";
import imgdropdown3 from "../../../../backend/assets/imgdropdown3.png";

const PricingContentMenu = ({ closeFlyout }) => {
  const categories = ["CAFÉ", "TRÀ", "TRÀ SỮA", "SINH TỐ", "TRÀ LẠNH"];
  const navigate = useNavigate();

  const handleNavigate = (category) => {
    closeFlyout(); 
    navigate(`/menu?category=${category}`);
  };

  const handleNavigateToMenu = () => {
    closeFlyout(); 
    navigate("/menu");
  };

  return (
    <div className="flex w-[1200px] bg-white p-6 shadow-xl">
      <div className="w-[500px] pr-4">
        <div className="mb-3 space-y-3">
          <h3 className="pb-4 text-3xl font-bold text-[#633c02]">THỰC ĐƠN</h3>
          <div className="space-y-4 pb-4">
            {categories.map((category) => (
              <a
                key={category}
                onClick={() => handleNavigate(category)}
                className="block cursor-pointer border-b-[1px] border-gray-400 pl-2 text-xl"
              >
                {category}
              </a>
            ))}
          </div>
        </div>
        <button
          onClick={handleNavigateToMenu}
          className="w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white"
        >
          Xem menu
        </button>
      </div>

      <div className="flex">
        {/* Item 1 */}
        <div className="w-1/3 px-4 text-start">
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
          <p className="mt-1 h-[60px] text-base text-gray-600">
            Hòa quyện giữa trà sữa và các hương liệu, nung nóng tạo hương vị đặc
            biệt.
          </p>
          <button
            className="mt-2 text-xl font-semibold text-orange-700 hover:text-orange-900"
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
          <p className="mt-1 h-[60px] text-base text-gray-600">
            Hương vị Chanh nước hoa thơm ngát kết hợp với trà tạo hương vị tinh
            tế và độc đáo.
          </p>
          <button
            className="mt-2 text-xl font-semibold text-orange-700 hover:text-orange-900"
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
          <p className="mt-1 h-[60px] text-base text-gray-600">
            Kết hợp hương vị ngọt ngào của mãng cầu mang đến sự tươi mới và hấp
            dẫn
          </p>
          <button
            className="mt-2 text-xl font-semibold text-orange-700 hover:text-orange-900"
            onClick={handleNavigateToMenu}
          >
            Xem thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingContentMenu;
