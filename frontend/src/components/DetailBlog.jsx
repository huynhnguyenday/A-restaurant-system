import React from "react";
import { useParams } from "react-router-dom";
import { blogs } from "./BlogMain";
import "./DetailBlog.css"; // Vẫn sử dụng CSS riêng cho styling

const DetailBlog = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === parseInt(id)); // Tìm bài viết theo id.

  if (!blog) {
    return <div>Blog not found!</div>;
  }

  return (
    <div className="container mx-auto my-10 px-4">
      <div className="grid grid-cols-10 gap-6">
        
        <div className="col-span-10 lg:col-span-7 detail-blog">
          <h1>TIN TỨC BAMOS</h1>
          <h2>{blog.title}</h2>
          <div className="divider"></div>
          <p className="author-date">
             Ngày: {blog.date}
          </p>
          <img src={blog.image} alt={blog.title} />
          <p className="content-blog">{blog.content}</p>
        </div>
        
        <div className="col-span-10 lg:col-span-3 related-blogs">
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
