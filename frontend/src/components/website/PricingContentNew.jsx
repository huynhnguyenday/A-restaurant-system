import React from "react";
import { useNavigate } from "react-router-dom";
import imgnews1 from "../../../../backend/assets/imgnews1.png";
import imgnews2 from "../../../../backend/assets/imgnews2.png";
import imgnews3 from "../../../../backend/assets/imgnews3.png";

const PricingContentNew = ({ closeFlyout }) => {
  const blogs = ["Giảm giá sốc mùa noel", "Trà sữa nay đã có nhiều lựa chọn", "Trà lạnh mùa hè thích hợp cả vào mùa đông"];
  const navigate = useNavigate();

  const handleNavigate = (blogTitle) => {
    closeFlyout();
    navigate(`/news?blog=${blogTitle}`);
  };

  const handleNavigateToNews = () => {
    closeFlyout();
    navigate("/news");
  };

  const overlayTitles = ["TỔ CHỨC EVENT", "ACOUSTIC", "BÓI BÀI TAROT"]; // Tiêu đề cho mỗi ảnh

  return (
    <div className="flex h-[480px] w-[1200px] bg-white shadow-xl">
      <div className="w-[400px] bg-[#2385a3] p-6 pr-4">
        <div className="mb-3 space-y-3">
          <h3 className="pb-4 text-3xl font-bold text-white">TIN TỨC</h3>
          <div className="space-y-4 pb-4">
            {blogs.map((blog) => (
              <a
                key={blog}
                onClick={() => handleNavigate(blog)}
                className="mr-4 block cursor-pointer border-b-[1px] border-white border-opacity-30 pl-2 !font-josefin text-2xl !text-white hover:!text-slate-400"
              >
                + {blog}
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
          {[imgnews2, imgnews3, imgnews1].map((image, index) => (
            <div
              key={index}
              className="group relative w-1/3 px-4 py-4 text-start"
            >
              {/* Tiêu đề overlay */}
              <div className="absolute left-6 bottom-6 z-10 rounded-md px-3 py-1 text-2xl font-bold text-white">
                {overlayTitles[index]}
              </div>
              {/* Ảnh */}
              <div className="overflow-hidden">
                <img
                  src={image}
                  alt={`imgnews${index + 1}`}
                  className="h-[440px] w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingContentNew;
