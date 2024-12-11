import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import imgbanner1 from "../../../../../backend/assets/imgbanner1.png";
import imgbanner2 from "../../../../../backend/assets/imgbanner2.png";
import imgbanner3 from "../../../../../backend/assets/imgbanner3.png";

const ManageBanner = () => {
  // Placeholder data for banners
  const placeholderData = [
    {
      id: 1,
      image: imgbanner1,
      title: "Khuyến mãi 1",
      date: "2024-12-11",
    },
    {
      id: 2,
      image: imgbanner2,
      title: "Khuyến mãi 2",
      date: "2024-12-10",
    },
    {
      id: 3,
      image: imgbanner3,
      title: "Khuyến mãi 3",
      date: "2024-12-09",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredbanners, setFilteredbanners] = useState(placeholderData);

  // Filter banners based on search term
  useEffect(() => {
    const results = placeholderData.filter(
      (banner) =>
        banner.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        banner.date.includes(searchTerm),
    );
    setFilteredbanners(results);
  }, [searchTerm]);

  const handleEditClick = (banner) => {
    console.log("Edit banner", banner);
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-7xl rounded-lg bg-white p-6 shadow-lg">
        {/* Header Section */}
        <div className="mb-4 text-center text-2xl font-bold">
          banner Management
        </div>

        {/* Search and Add banner */}
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
              onClick={() => console.log("Add new banner")}
              className="rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 px-4 py-2 text-sm text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              Add banner
            </span>
          </div>
        </div>

        {/* banner Table */}
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-center">Image</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-center">Date</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredbanners.map((banner) => (
                <tr key={banner.id} className="border-b">
                  <td className="flex justify-center px-4 py-4 text-center">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="h-16 w-auto rounded object-cover"
                    />
                  </td>
                  <td className="px-4 py-4 font-bold">{banner.title}</td>
                  <td className="px-4 py-4 text-center">
                    {formatDate(banner.date)}
                  </td>
                  <td className="px-4 py-4 text-center">
                    {/* Container for Edit and Delete buttons */}
                    <div className="flex justify-center space-x-4 text-xl">
                      <div className="group relative">
                        <button
                          className="rounded-full px-3 py-1 text-blue-400 hover:bg-slate-300"
                          onClick={() => handleEditClick(banner)}
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                        <span className="absolute bottom-full left-1/2 mb-4 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 px-2 py-2 text-sm text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                          Edit Banner
                        </span>
                      </div>
                      <div className="group relative">
                        <button className="rounded-md px-3 py-1 text-center text-red-400 hover:rounded-full hover:bg-slate-300">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <span className="absolute bottom-full left-1/2 mb-4 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 px-2 py-2 text-sm text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                          Delete Banner
                        </span>
                      </div>
                    </div>
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

export default ManageBanner;
