import React from "react";
import { useParams } from "react-router-dom";
import { blogs } from "./BlogMain";
import "./DetailBlog.css"; // Vẫn sử dụng CSS riêng cho styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";

const DetailBlog = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === parseInt(id)); // Tìm bài viết theo id.

  if (!blog) {
    return (
      <button
        type="button"
        className="mx-auto mb-20 mt-20 flex h-24 w-1/3 items-center justify-center rounded-full bg-black text-2xl text-white"
      >
        <a href="/news" className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faNewspaper} className="text-4xl" />
          <span className="text-xl">QUAY TRỞ LẠI TRANG TIN TỨC</span>
        </a>
      </button>
    );
  }

  return (
    <div className="container mx-auto my-10 px-4">
      <div className="grid grid-cols-10 gap-6">
        <div className="detail-blog col-span-10 lg:col-span-7">
          <h1>TIN TỨC BAMOS</h1>
          <h2>{blog.title}</h2>
          <div className="divider"></div>
          <p className="author-date">Ngày: {blog.date}</p>
          <img src={blog.image} alt={blog.title} />
          <p className="content-blog">{blog.content}</p>
        </div>

        <div className="related-blogs col-span-10 lg:col-span-3">
          <h3>Bài viết khác</h3>
          <ul>
            {blogs
              .filter((b) => b.id !== blog.id)
              .map((otherBlog) => (
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

export default DetailBlog;
