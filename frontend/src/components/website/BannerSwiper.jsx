import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Loading from "./Loading"; // Import Loading component

const BannerSwiper = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]); // State chứa danh sách banner
  const [loading, setLoading] = useState(true); // Trạng thái loading cho banner
  const swiperRef = useRef(null);

  useEffect(() => {
    // Fetch the banner blogs from the API
    const fetchBannerBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/blogs/bannerBlogs",
        );
        setBlogs(response.data.data); // Lưu dữ liệu vào state
      } catch (error) {
        console.error("Error fetching banner blogs:", error);
      } finally {
        setLoading(false); // Dừng loading khi dữ liệu đã tải xong
      }
    };

    fetchBannerBlogs();
  }, []);

  useEffect(() => {
    // Đảm bảo autoplay bắt đầu khi dữ liệu đã được tải
    if (swiperRef.current && blogs.length > 0) {
      swiperRef.current.swiper.autoplay.start(); // Bắt đầu autoplay thủ công
    }
  }, [blogs]); // Trigger khi blogs data có sẵn

  return (
    <div className="group relative mx-auto max-h-[580px] max-w-full overflow-hidden">
      {loading ? (
        // Hiển thị phần loading nếu dữ liệu chưa được tải
        <div className="flex h-[255px] w-full items-center justify-center lg:h-[500px]">
          <Loading /> {/* Hiển thị Loading khi đang tải dữ liệu */}
        </div>
      ) : (
        <Swiper
          ref={swiperRef} // Thêm swiperRef để lấy tham chiếu của Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            prevEl: ".swiper-button-prev-banner",
            nextEl: ".swiper-button-next-banner",
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            waitForTransition: false,
          }}
          loop={true}
          onAutoplayStart={(swiper) => {
            // Đảm bảo autoplay luôn chạy
            if (!swiper.autoplay.running) {
              swiper.autoplay.start();
            }
          }}
        >
          {blogs.map((blog) => (
            <SwiperSlide key={blog._id}>
              <div
                className="relative h-[255px] w-full cursor-pointer overflow-hidden shadow-lg lg:h-[460px]"
                onClick={() => navigate(`/blogs/${blog._id}`)}
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-full lg:h-[460px] w-full object-cover lg:object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div
        className="swiper-button-prev-banner absolute left-4 top-1/2 z-10 hidden h-[70px] w-[40px] -translate-y-1/2 cursor-pointer items-center justify-center text-white group-hover:flex"
        style={{
          backgroundColor: "rgba(78, 78, 78, 0.5)",
        }}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-4xl" />
      </div>

      <div
        className="swiper-button-next-banner absolute right-4 top-1/2 z-10 hidden h-[70px] w-[40px] -translate-y-1/2 cursor-pointer items-center justify-center text-white group-hover:flex"
        style={{
          backgroundColor: "rgba(78, 78, 78, 0.5)",
        }}
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-4xl" />
      </div>
    </div>
  );
};

export default BannerSwiper;
