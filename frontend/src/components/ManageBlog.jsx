import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import imgblog1 from "../assets/imgblog1.png";
import imgblog2 from "../assets/imgblog2.png";
import imgblog3 from "../assets/imgblog3.png";

// Dữ liệu blog ban đầu
const blogs = [
  {
    id: 1,
    title: "Here are the trends I see coming this fall",
    date: "27/04/2024",
    image: imgblog1,
    content: "Detailed content for blog 1. Here is where the full article will be displayed. This is a long content for testing purposes.",
  },
  {
    id: 2,
    title: "The ultimate guide to your autumn wardrobe",
    date: "25/02/2024",
    image: imgblog2,
    content: "Detailed content for blog 2. Here's everything you need to know about autumn wardrobes. This content is also a bit long to check how it is displayed.",
  },
  {
    id: 3,
    title: "Top 5 destinations for this winter vacation",
    date: "27/02/2024",
    image: imgblog3,
    content: "Detailed content for blog 3. Explore the best destinations for your winter vacation! This content has some extra length.",
  },
];

const ManageBlog = () => {
  const [blogList, setBlogList] = useState(blogs);
  const [searchTerm, setSearchTerm] = useState("");

  // Lọc blog dựa trên từ khóa tìm kiếm
  const filteredBlogs = blogList.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Xóa blog
  const deleteBlog = (id) => {
    const updatedBlogs = blogList.filter((blog) => blog.id !== id);
    setBlogList(updatedBlogs);
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
                <tr key={blog.id} className="border-b">
                  <td className="py-4 px-4 text-center flex justify-center">
                    <img src={blog.image} alt={blog.title} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="py-4 px-4 font-bold">{blog.title}</td>
                  <td className="py-4 px-4 text-center">
                    {truncateContent(blog.content, 50)} {/* Cắt nội dung tại đây */}
                  </td>
                  <td className="py-4 px-4 text-center">{blog.date}</td>
                  <td className="py-4 px-4 text-center">
                    <button className="text-blue-700 px-3 py-1 mr-2 text-center rounded-md hover:bg-slate-300 hover:rounded-full">
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button
                      className="text-red-700 px-3 py-1 text-center rounded-md hover:bg-slate-300 hover:rounded-full"
                      onClick={() => deleteBlog(blog.id)}
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
