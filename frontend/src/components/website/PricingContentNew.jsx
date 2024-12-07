import React from "react";
import { useNavigate } from "react-router-dom";

const PricingContentNew = () => {
  const categories = ["CAFÉ", "TRÀ", "TRÀ SỮA", "SINH TỐ", "TRÀ LẠNH"];
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const handleNavigate = (category) => {
    navigate(`/menu?category=${category}`);
  };

  const handleNavigateToNews = () => {
    navigate("/news"); // Điều hướng đến trang /menu
  };

  return (
    <div className="flex w-[1200px] border-2 border-black bg-white p-6 shadow-xl">
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
                className="block cursor-pointer border-b-[1px] border-gray-400 pb-2 pl-2 text-xs"
              >
                {category}
              </a>
            ))}
          </div>
        </div>
        <button
          onClick={handleNavigateToNews}
          className="w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white"
        >
          Xem tin tức
        </button>
      </div>

      <div className="flex h-1/4 w-1/4 justify-between">
        
      </div>
    </div>
  );
};

export default PricingContentNew;
