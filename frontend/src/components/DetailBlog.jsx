import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DetailBlog.css"; // Vẫn sử dụng CSS riêng cho styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import Loading from "../components/website/Loading";

const DetailBlog = () => {
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate(); // Để điều hướng nếu cần
  const [blog, setBlog] = useState(null); // Lưu bài viết hiện tại
  const [relatedBlogs, setRelatedBlogs] = useState([]); // Lưu bài viết liên quan
  const [loading, setLoading] = useState(true); // Trạng thái loading

  // Fetch dữ liệu bài viết từ API
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/blogs/${id}`,
        ); // Gọi API lấy bài viết

        if (response.data.success) {
          setBlog(response.data.data); // Lưu bài viết vào state

          // Fetch danh sách bài viết liên quan (trừ bài viết hiện tại)
          const relatedResponse = await axios.get(
            "http://localhost:5000/api/blogs",
          );
          if (relatedResponse.data.success) {
            setRelatedBlogs(
              relatedResponse.data.data.filter(
                (b) => b._id !== response.data.data._id,
              ),
            );
          }
        } else {
          navigate("/news"); // Nếu không tìm thấy bài viết, quay về trang tin tức
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        navigate("/news");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, navigate]);

  if (loading) {
    return <div className="loading min-h-screen flex  w-full"><Loading/></div>;
  }

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
    <div className="mx-auto my-10 max-w-7xl px-4">
      <div className="grid grid-cols-10 gap-6">
        <div className="detail-blog col-span-10 lg:col-span-7">
          <h1>TIN TỨC BAMOS</h1>
          <h2>{blog.title}</h2>
          <div className="divider"></div>
          <p className="author-date">
            Ngày: {new Date(blog.updatedAt).toLocaleDateString("vi-VN")}
          </p>
          <img src={blog.image} alt={blog.title} />
          <div
            className="content-blog"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>
        </div>

        <div className="related-blogs col-span-10 lg:col-span-3">
          <h3>Bài viết khác</h3>
          <ul>
            {relatedBlogs.map((otherBlog) => (
              <li key={otherBlog._id}>
                <a href={`/blogs/${otherBlog._id}`}>{otherBlog.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailBlog;
