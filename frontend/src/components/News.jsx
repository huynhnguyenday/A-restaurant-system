import React from "react";
import { useNavigate } from "react-router-dom";
import { blogs } from "./BlogMain";
import "./news.css"; 


const formatDate = (dateString) => {
  const [day, month] = dateString.split("/"); 
  return `${day} Th${parseInt(month)}`; 
};

const News = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto my-10 px-4">
      <div className="grid grid-cols-10 gap-6">
        {/* Phần hiển thị tất cả các bài viết*/}
        <div className="col-span-10 lg:col-span-7 all-blogs">
          <h1 className="title-news">TẤT CẢ TIN TỨC BAMOS</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="card-news"
                onClick={() => navigate(`/blogs/${blog.id}`)} // Chuyển hướng
                style={{ cursor: "pointer" }} // Hiển thị con trỏ khi hover
              >
                {/* Phần trên: Ảnh bài viết */}
                <div className="card-news-image">
                  {/* Ô hình tròn hiển thị ngày */}
                  <div className="date-badge">{formatDate(blog.date)}</div>
                  <img src={blog.image} alt={blog.title} />
                </div>
                {/* Phần dưới: Tiêu đề và đoạn trích */}
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

        {/* Phần bài viết khác */}
        <div className="col-span-10 lg:col-span-3 related-blogs">
          <h3>Bài viết mới</h3>
          <ul>
            {blogs.map((otherBlog) => (
              <li key={otherBlog.id}>
                <a href={`/blogs/${otherBlog.id}`}>{otherBlog.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default News;
