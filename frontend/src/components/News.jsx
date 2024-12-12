import React from "react";
import { useNavigate } from "react-router-dom";
import imgblog1 from "../../../backend/assets/imgblog1.png";
import imgblog2 from "../../../backend/assets/imgblog2.png";
import imgblog3 from "../../../backend/assets/imgblog3.png";

const formatDate = (dateString) => {
  const [day, month] = dateString.split("/");
  return `${day} Th${parseInt(month)}`;
};

const News = () => {
  // Placeholder data
  const newsData = [
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
    {
      id: 5,
      title: "Trà đá mát lạnh",
      date: "29/03/2024",
      image: imgblog2,
      content:
        "Detailed content for blog 5. Discover the perfect summer drinks for you.",
    },
    {
      id: 6,
      title: "Sữa chua trân châu",
      date: "15/06/2024",
      image: imgblog1,
      content:
        "Detailed content for blog 6. Learn more about the best dessert drinks of the season.",
    },
  ];

  const navigate = useNavigate();

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
            key={blog.id}
            className="mb-4 flex h-[280px] w-[300px] transform flex-col overflow-hidden rounded-lg border border-[#e0e0e0] bg-white shadow-lg transition-all duration-200 hover:scale-105"
            onClick={() => navigate(`/blogs/${blog.id}`)}
            style={{ cursor: "pointer" }}
          >
            {/* Phần trên: Ảnh bài viết */}
            <div className="relative flex-1 bg-[#f0f0f0]">
              <div className="absolute left-2 top-2 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#d88453] text-xs font-bold text-white shadow-md">
                {formatDate(blog.date)}
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
              <p className="pb-2 text-sm text-[#555]">
                {blog.content.length > 50
                  ? `${blog.content.slice(0, 50)}...`
                  : blog.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
