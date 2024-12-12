import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "swiper/css";
import "swiper/css/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import imgbanner1 from "../../../../backend/assets/imgbanner1.png";
import imgbanner2 from "../../../../backend/assets/imgbanner2.png";
import imgbanner3 from "../../../../backend/assets/imgbanner3.png";

const BannerSwiper = () => {
  const navigate = useNavigate(); // Hook để điều hướng
  const blogs = [
    {
      id: 1,
      image: imgbanner1,
      title: "Khuyến mãi 1",
    },
    {
      id: 2,
      image: imgbanner2,
      title: "Khuyến mãi 2",
    },
    {
      id: 3,
      image: imgbanner3,
      title: "Khuyến mãi 3",
    },
  ];

  return (
    <div className="group relative mx-auto max-h-[500px] max-w-full overflow-hidden">
      <Swiper
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
        }}
        loop={true}
      >
        {blogs.map((blog) => (
          <SwiperSlide key={blog.id}>
            <div
              className="h-full w-full cursor-pointer"
              onClick={() => navigate(`/blogs/${blog.id}`)} // Điều hướng khi nhấn vào banner
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
