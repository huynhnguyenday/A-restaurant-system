import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPen,
  faTrash,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import AddBlog from "./AddBlog";
import UpdateBlog from "./UpdateBlog";

const ManageBlog = () => {
  const [blogList, setBlogList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [isEditFormVisible, setEditFormVisible] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Lọc blog dựa trên từ khóa tìm kiếm
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs");
        setBlogList(response.data.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
    setEditFormVisible(true);
  };

  const formatDate = (timestamp) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(timestamp).toLocaleDateString("en-GB", options);
  };

  // Hàm để cắt nội dung
  const truncateContent = (content, length) => {
    if (content.length > length) {
      return content.substring(0, length) + "...";
    }
    return content;
  };

  const filteredBlogs = blogList.filter((blog) => {
    return (
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatDate(blog.createdAt).includes(searchTerm)
    );
  });

  const toggleDisplayHot = async (id) => {
    try {
      // Cập nhật trạng thái local
      const updatedBlogs = blogList.map((blog) =>
        blog._id === id
          ? { ...blog, displayHot: blog.displayHot === 1 ? 2 : 1 }
          : blog,
      );
      setBlogList(updatedBlogs);

      // Gửi yêu cầu API để cập nhật trạng thái trên server
      await axios.put(`http://localhost:5000/api/blogs/${id}`, {
        displayHot: updatedBlogs.find((blog) => blog._id === id).displayHot,
      });
    } catch (error) {
      console.error("Error updating display hot:", error);

      // Khôi phục trạng thái ban đầu nếu có lỗi
      setBlogList((prev) =>
        prev.map((blog) =>
          blog._id === id
            ? { ...blog, displayHot: blog.displayHot === 2 ? 1 : 2 }
            : blog,
        ),
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-7xl rounded-lg bg-white p-6 shadow-lg">
        {/* Header Section */}
        <div className="mb-4 text-center text-2xl font-bold">
          Blog Management
        </div>

        {/* Search and Add Blog */}
        <div className="mb-4 flex items-center justify-between">
          <input
            type="text"
            placeholder="Search by Title or Date"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-72 rounded-md border border-gray-300 p-2"
          />
          {/* Tooltip và nút Plus */}
          <div className="group relative">
            <button
              onClick={() => setAddFormVisible(true)}
              className="rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 px-4 py-2 text-sm text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              Add Blog
            </span>
          </div>
        </div>

        {/* Blog Table */}
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-center">Image</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Content</th>
                <th className="px-4 py-2 text-center">Date</th>
                <th className="px-4 py-2 text-center">Hot</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.map((blog) => (
                <tr key={blog._id} className="border-b">
                  <td className="flex justify-center px-4 py-4 text-center">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="h-16 w-16 rounded object-cover"
                    />
                  </td>
                  <td className="px-4 py-4 font-bold">{blog.title}</td>
                  <td className="px-4 py-4 text-center">
                    {truncateContent(blog.content, 50)}{" "}
                  </td>
                  <td className="px-4 py-4 text-center">
                    {formatDate(blog.createdAt)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <div className="group relative">
                      <FontAwesomeIcon
                        icon={faFire}
                        className={
                          blog.displayHot === 1
                            ? "cursor-pointer text-2xl text-red-500"
                            : "cursor-pointer text-xl text-gray-400"
                        }
                        onClick={() => toggleDisplayHot(blog._id)}
                      />
                      <span className="absolute bottom-full left-1/2 mb-4 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 px-2 py-2 text-sm text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                        Set Hot Product
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button
                      className="mr-2 rounded-md px-3 py-1 text-center text-blue-700 hover:rounded-full hover:bg-slate-300"
                      onClick={() => handleEditClick(blog)} // Chỉnh sửa blog
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button className="rounded-md px-3 py-1 text-center text-red-700 hover:rounded-full hover:bg-slate-300">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddFormVisible && (
        <AddBlog
          onClose={() => setAddFormVisible(false)}
          onBlogAdded={(newBlog) => setBlogList((prev) => [newBlog, ...prev])}
        />
      )}

      {isEditFormVisible && selectedBlog && (
        <UpdateBlog
          blog={selectedBlog}
          onClose={() => setEditFormVisible(false)}
          onBlogUpdated={(updatedBlog) => {
            setBlogList((prev) =>
              prev.map((blog) =>
                blog._id === updatedBlog._id ? updatedBlog : blog,
              ),
            );
          }}
        />
      )}
    </div>
  );
};

export default ManageBlog;
