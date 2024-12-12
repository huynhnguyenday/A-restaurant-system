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

const BannerSwiper = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const swiperRef = useRef(null); // Reference to the Swiper instance

  useEffect(() => {
    // Fetch the banner blogs from the API
    const fetchBannerBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/blogs/bannerBlogs",
        );
        setBlogs(response.data.data); // Store the data in the state
      } catch (error) {
        console.error("Error fetching banner blogs:", error);
      }
    };

    fetchBannerBlogs();
  }, []);

  useEffect(() => {
    // Ensure autoplay starts once data is loaded
    if (swiperRef.current && blogs.length > 0) {
      swiperRef.current.swiper.autoplay.start(); // Start autoplay manually
    }
  }, [blogs]); // This will trigger when blogs data is available

  return (
    <div className="group relative mx-auto max-h-[500px] max-w-full overflow-hidden">
      {blogs.length > 0 && (
        <Swiper
          ref={swiperRef} // Add the swiperRef to get a reference of the Swiper instance
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
            // Ensure autoplay is always running
            if (!swiper.autoplay.running) {
              swiper.autoplay.start();
            }
          }}
        >
          {blogs.map((blog) => (
            <SwiperSlide key={blog._id}>
              <div
                className="h-full w-full cursor-pointer"
                onClick={() => navigate(`/blogs/${blog._id}`)}
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-[500px] w-full"
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
