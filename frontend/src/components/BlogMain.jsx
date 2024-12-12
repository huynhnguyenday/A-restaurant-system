import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // Import Navigation module
import "swiper/css";
import "swiper/css/navigation";
import imgblog1 from "../../../backend/assets/imgblog1.png";
import imgblog2 from "../../../backend/assets/imgblog2.png";
import imgblog3 from "../../../backend/assets/imgblog3.png";

export const blogs = [
  {
    id: 1,
    title: "Cà phê nguyên chất",
    date: "27/04/2024",
    image: imgblog1,
    content:
      "Detailed content for blog 1. Here is where the full article will be displayed.",
  },
  {
    id: 2,
    title: "Trà sữa hấp dẫn",
    date: "25/02/2024",
    image: imgblog2,
    content:
      "Detailed content for blog 2. Here's everything you need to know about autumn wardrobes.",
  },
  {
    id: 3,
    title: "Trà lạnh mùa hè",
    date: "27/02/2024",
    image: imgblog3,
    content:
      "Detailed content for blog 3. Explore the best destinations for your winter vacation!",
  },
  {
    id: 4,
    title: "Trà lạnh mùa hè",
    date: "27/02/2024",
    image: imgblog3,
    content:
      "Detailed content for blog 3. Explore the best destinations for your winter vacation!",
  },
];

const BlogMain = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: i * 0.4 },
    }),
  };

  return (
    <div className="bg-[#f9f9f9] py-12 font-sans">
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-8 text-center">
          <div className="text-4xl font-bold text-[#633402]">
            Tin mới nóng hổi
          </div>
          <div className="bg-brown-800 mx-auto my-4 h-1 w-12"></div>
        </div>
        <div className="flex flex-wrap justify-center gap-12" ref={ref}>
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView="auto"
            navigation
            loop={false}
            breakpoints={{
              430: { slidesPerView: 1.3 },
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.3 },
            }}
          >
            {blogs.map((blog, index) => (
              <SwiperSlide key={blog.id}>
                <motion.div
                  className="flex justify-center"
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  custom={index}
                  variants={cardVariants}
                >
                  <div className="group relative mb-12 w-full max-w-[350px]">
                    {/* The container for the image */}
                    <div className="relative h-[255px] w-full overflow-hidden shadow-lg">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                      />
                    </div>

                    {/* Overlay Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-center text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                      <h4 className="mb-2 px-4 text-xl font-bold">
                        {blog.title}
                      </h4>
                      <span className="mb-2 text-sm italic">{blog.date}</span>
                      <Link
                        className="text-sm text-white underline hover:text-red-500"
                        to={`/blogs/${blog.id}`}
                      >
                        Đọc Thêm
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default BlogMain;
