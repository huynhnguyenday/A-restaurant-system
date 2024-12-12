import React, { useState } from "react";
import "./news.css";
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
      title: "Trà lạnh mùa hèeeee",
      date: "27/02/2024",
      image: imgblog3,
      content:
        "Detailed content for blog 3. Explore the best destinations for your winter vacation!",
    },
  ];

  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <div className="container mx-auto my-10 px-4">
      {selectedBlog ? (
        // Chi tiết bài viết
        <div>
          <button
            onClick={() => setSelectedBlog(null)}
            className="mb-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Quay lại
          </button>
          <div className="blog-detail">
            <h1 className="text-2xl font-bold">{selectedBlog.title}</h1>
            <p className="text-gray-500">{formatDate(selectedBlog.date)}</p>
            <img
              src={selectedBlog.image}
              alt={selectedBlog.title}
              className="my-4 w-full rounded-lg"
            />
            <p>{selectedBlog.content}</p>
          </div>
        </div>
      ) : (
        // Danh sách bài viết
        <div className="grid grid-cols-10 gap-6">
          <div className="all-blogs col-span-10 lg:col-span-7">
            <h1 className="title-news">TẤT CẢ TIN TỨC BAMOS</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {newsData.map((blog) => (
                <div
                  key={blog.id}
                  className="card-news"
                  onClick={() => setSelectedBlog(blog)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-news-image">
                    <div className="date-badge">{formatDate(blog.date)}</div>
                    <img src={blog.image} alt={blog.title} />
                  </div>
                  <div className="card-news-content">
                    <h2 className="card-news-title">{blog.title}</h2>
                    <p className="card-news-snippet">
                      {blog.content.length > 50
                        ? `${blog.content.slice(0, 50)}...`
                        : blog.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="related-blogs col-span-10 lg:col-span-3">
            <h3>Bài viết mới</h3>
            <ul>
              {newsData.map((otherBlog) => (
                <li key={otherBlog.id}>
                  <a
                    onClick={() => setSelectedBlog(otherBlog)}
                    style={{ cursor: "pointer" }}
                  >
                    {otherBlog.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
