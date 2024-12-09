import React from "react";
import { useNavigate } from "react-router-dom";
import imgnews1 from "../../../../backend/assets/imgnews1.png";
import imgnews2 from "../../../../backend/assets/imgnews2.png";
import imgnews3 from "../../../../backend/assets/imgnews3.png";

const PricingContentNew = ({ closeFlyout }) => {
  const categories = ["CAFÉ", "TRÀ", "TRÀ SỮA", "SINH TỐ", "TRÀ LẠNH"];
  const navigate = useNavigate(); 

  const handleNavigate = (category) => {
    closeFlyout();
    navigate(`/menu?category=${category}`);
  };

  const handleNavigateToNews = () => {
    closeFlyout();
    navigate("/news"); 
  };

  return (
    <div className="flex h-[480px] w-[1200px] bg-white shadow-xl">
      <div className="w-[400px] bg-[#2385a3] p-6 pr-4">
        <div className="mb-3 space-y-3">
          <h3 className="pb-4 text-3xl font-bold text-white">TIN TỨC</h3>
          <div className="space-y-4 pb-4">
            {categories.map((category) => (
              <a
                key={category}
                onClick={() => handleNavigate(category)}
                className="mr-4 block cursor-pointer border-b-[1px] border-white border-opacity-30 pl-2 !font-josefin text-2xl !text-white hover:!text-slate-400"
              >
                + {category}
              </a>
            ))}
          </div>
        </div>
        <button
          onClick={handleNavigateToNews}
          className="w-1/2 rounded-lg border-2 border-[#d88453] bg-[#d88453] px-4 py-2 font-semibold text-white transition-colors hover:rounded-3xl hover:border-[#103e4c] hover:bg-[#103e4c]"
        >
          Xem tin tức
        </button>
      </div>

      <div className="flex w-full flex-col">
        <div className="flex">
          {/* Item 1 */}
          <div className="w-1/3 py-4 px-4 text-start">
            <div className="overflow-hidden">
              <img
                src={imgnews2}
                alt="imgnews1"
                className="h-[440px] w-full object-cover"
              />
            </div>
          </div>

          {/* Item 2 */}
          <div className="w-1/3 py-4 px-4 text-start">
            <div className="overflow-hidden">
              <img
                src={imgnews3}
                alt="imgnews2"
                className="h-[440px] w-full object-cover"
              />
            </div>
          </div>

          {/* Item 3 */}
          <div className="w-1/3 py-4 px-4 text-start">
            <div className="overflow-hidden">
              <img
                src={imgnews1}
                alt="imgnews3"
                className="h-[440px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingContentNew;
