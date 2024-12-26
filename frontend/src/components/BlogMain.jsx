import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // Import Navigation module
import "swiper/css";
import "swiper/css/navigation";
import Loading from "../components/website/Loading";

const BlogMain = () => {
  const [blogs, setBlogs] = useState([]); // State lưu trữ dữ liệu blogs
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false });
  const [loading, setLoading] = useState(true);

  // Fetch blogs từ API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:5000/api/blogs/hotBlogs",
        ); // Đường dẫn đến API
        if (response.data.success) {
          setBlogs(response.data.data); // Lưu data vào state
        }
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

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
          <div className="mx-auto my-4 mb-14 h-1 w-12 bg-[#633c02]"></div>
        </div>
        {loading ? (
        // Hiển thị phần loading nếu dữ liệu chưa được tải
        <div className="flex h-[255px] w-full items-center justify-center lg:h-[400px]">
          <Loading /> {/* Hiển thị Loading khi đang tải dữ liệu */}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-12" ref={ref}>
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView="auto"
            loop={false}
            breakpoints={{
              430: { slidesPerView: 1.3 },
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.3 },
            }}
            navigation={false} // Tắt nút điều hướng
          >
            {blogs.map((blog, index) => (
              <SwiperSlide key={blog._id}>
                <motion.div
                  className="flex justify-center"
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  custom={index}
                  variants={cardVariants}
                >
                  <div className="group relative mb-12 ml-4 w-full max-w-[350px]">
                    {/* The container for the image */}
                    <Link
                      to={`/blogs/${blog._id}`}
                    >
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
                        <span className="mb-2 text-sm italic">
                          {new Date(blog.updatedAt).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      </div>
    </div>
  );
};

export default BlogMain;
