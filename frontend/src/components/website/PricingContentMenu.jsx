import React from "react";
import { useNavigate } from "react-router-dom";
import imgdropdown1 from "../../../../backend/assets/imgdropdown1.png";
import imgdropdown2 from "../../../../backend/assets/imgdropdown2.png";
import imgdropdown3 from "../../../../backend/assets/imgdropdown3.png";

const PricingContentMenu = () => {
  const categories = ["CAFÉ", "TRÀ", "TRÀ SỮA", "SINH TỐ", "TRÀ LẠNH"];
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const handleNavigate = (category) => {
    navigate(`/menu?category=${category}`);
  };

  const handleNavigateToMenu = () => {
    navigate("/menu"); // Điều hướng đến trang /menu
  };

  return (
    <div className="flex w-[1200px] rounded-3xl border-2 border-orange-900 bg-white p-6 shadow-xl">
      <div className="w-[250px] pr-4">
        <div className="mb-3 space-y-3">
          <h3 className="pb-4 text-3xl font-semibold text-[#633c02]">
            THỰC ĐƠN
          </h3>
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

      <div className="flex h-1/4 w-1/4 justify-between">
        <img
          src={imgdropdown1}
          alt="imgdropdown1"
          className="h-auto w-full px-4"
        />
        <img
          src={imgdropdown2}
          alt="imgdropdown2"
          className="h-auto w-full px-4"
        />
        <img
          src={imgdropdown3}
          alt="imgdropdown3"
          className="h-auto w-full px-4"
        />
      </div>
    </div>
  );
};

export default PricingContentMenu;
