import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng từ 0 nên cần cộng thêm 1
  return `${day} Th${parseInt(month)}`;
};

const News = () => {
  const [newsData, setNewsData] = useState([]); // State để lưu trữ dữ liệu blog từ API
  const navigate = useNavigate();

  useEffect(() => {
    // Hàm để gọi API lấy dữ liệu blogs
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs"); // API lấy blogs
        setNewsData(response.data.data); // Lưu dữ liệu vào state
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs(); // Gọi API khi component mount
  }, []);

  return (
    <div className="container mx-auto my-10 px-4">
      <div className="text-center">
        {/* Phần hiển thị tiêu đề tin tức */}
        <h1 className="py-8 text-4xl font-bold text-[#633402]">
          TẤT CẢ TIN TỨC BAMOS
        </h1>
      </div>
      <div className="grid grid-cols-1 justify-items-center gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {/* Phần hiển thị tất cả các bài viết*/}
        {newsData.map((blog) => (
          <div
            key={blog._id}
            className="mb-4 flex h-[280px] w-[300px] transform flex-col overflow-hidden rounded-lg border border-[#e0e0e0] bg-white shadow-lg transition-all duration-200 hover:scale-105"
            onClick={() => navigate(`/blogs/${blog._id}`)}
            style={{ cursor: "pointer" }}
          >
            {/* Phần trên: Ảnh bài viết */}
            <div className="relative flex-1 bg-[#f0f0f0]">
              <div className="absolute left-2 top-2 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#d88453] text-xs font-bold text-white shadow-md">
                {formatDate(blog.updatedAt)}
              </div>
              <img
                src={blog.image}
                alt={blog.title}
                className="h-full w-full object-cover"
              />
            </div>
            {/* Phần dưới: Tiêu đề và đoạn trích */}
            <div className="p-2 text-center">
              <h2 className="mb-2 text-lg font-bold text-[#633402]">
                {blog.title}
              </h2>
              <p
                className="pb-2 text-sm text-[#555]"
                dangerouslySetInnerHTML={{
                  __html:
                    blog.content.length > 50
                      ? `${blog.content.slice(0, 50)}...`
                      : blog.content,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
