import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ManageBlog = () => {
  const [blogList, setBlogList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Lọc blog dựa trên từ khóa tìm kiếm
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs");
        setBlogList(response.data.data); // Giả sử API trả về data trong `response.data.data`
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);
  const filteredBlogs = blogList.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(blog.createdAt).toLocaleDateString().includes(searchTerm) // So sánh với ngày tháng
  );


  // Xóa blog
  const deleteBlog = (id) => {
    const updatedBlogs = blogList.filter((blog) => blog.id !== id);
    setBlogList(updatedBlogs);
  };

  const formatDate = (timestamp) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(timestamp).toLocaleDateString("en-GB", options); // Định dạng DD/MM/YYYY
  };

  // Hàm để cắt nội dung
  const truncateContent = (content, length) => {
    if (content.length > length) {
      return content.substring(0, length) + "..."; // Cắt nội dung và thêm dấu "..."
    }
    return content;
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-gray-50">
      <div className="w-full max-w-7xl bg-white p-6 rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="text-2xl font-bold mb-4 text-center">Blog Management</div>

        {/* Search and Add Blog */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by Title or Date"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-72"
          />
          {/* Tooltip và nút Plus */}
          <div className="relative group">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <span
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-sm rounded-md px-4 py-2 shadow-lg whitespace-nowrap"
            >
              Add Blog
            </span>
          </div>
        </div>

        {/* Blog Table */}
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-center">Image</th>
                <th className="py-2 px-4 text-left">Title</th>
                <th className="py-2 px-4 text-left">Content</th>
                <th className="py-2 px-4 text-center">Date</th>
                <th className="py-2 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.map((blog) => (
                <tr key={blog._id} className="border-b">
                  <td className="py-4 px-4 text-center flex justify-center">
                    <img src={blog.image} alt={blog.title} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="py-4 px-4 font-bold">{blog.title}</td>
                  <td className="py-4 px-4 text-center">
                    {truncateContent(blog.content, 50)} {/* Cắt nội dung tại đây */}
                  </td>
                  <td className="py-4 px-4 text-center">{formatDate(blog.createdAt)}</td>
                  <td className="py-4 px-4 text-center">
                    <button className="text-blue-700 px-3 py-1 mr-2 text-center rounded-md hover:bg-slate-300 hover:rounded-full">
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button
                      className="text-red-700 px-3 py-1 text-center rounded-md hover:bg-slate-300 hover:rounded-full"
                      onClick={() => deleteBlog(blog._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBlog;
