import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import imgnews1 from "../../../../backend/assets/imgnews1.png";
import imgnews2 from "../../../../backend/assets/imgnews2.png";
import imgnews3 from "../../../../backend/assets/imgnews3.png";
import Loading from "./Loading"; // Import your loading component

const PricingContentNew = ({ closeFlyout }) => {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/blogs/latestBlogs",
        );
        if (response.data.success) {
          setLatestBlogs(response.data.data); // Cập nhật danh sách blogs
          setLoading(false); // Set loading to false once data is fetched
        }
      } catch (error) {
        console.error("Error fetching latest blogs:", error.message);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchLatestBlogs();
  }, []);

  const handleNavigate = (blogTitle) => {
    closeFlyout();
    navigate(`/news?blog=${blogTitle}`);
  };

  const handleNavigateToNews = () => {
    closeFlyout();
    navigate("/news");
  };

  const overlayTitles = ["TỔ CHỨC EVENT", "ACOUSTIC", "BÓI BÀI TAROT"];

  return (
    <div className="flex h-[480px] w-[1200px] bg-white shadow-xl">
      <div className="w-[400px] bg-[#2385a3] p-6 pr-4">
        <div className="mb-3 space-y-3">
          <h3 className="pb-4 text-3xl font-bold text-white">TIN TỨC</h3>
          <div className="space-y-4 pb-4">
            {loading ? ( // Show loading while fetching blogs
              <Loading /> // Use your loading component here
            ) : (
              latestBlogs.map((blog) => (
                <a
                  key={blog._id}
                  onClick={() => handleNavigate(blog)}
                  className="mr-4 block cursor-pointer border-b-[1px] border-white border-opacity-30 pl-2 !font-josefin text-base !text-white hover:!text-slate-400"
                >
                  +{" "}
                  {blog.title.length > 50
                    ? `${blog.title.substring(0, 40)}...`
                    : blog.title}
                </a>
              ))
            )}
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
              <div className="absolute bottom-6 left-5 z-10 rounded-md px-3 py-1 text-2xl font-bold text-white">
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
