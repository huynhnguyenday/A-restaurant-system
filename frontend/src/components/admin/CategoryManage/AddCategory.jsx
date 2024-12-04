import { useState } from "react";
import PropTypes from "prop-types";

const AddCategory = ({ onAddCategory, onClose }) => {
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    status: "active", // Mặc định là "active"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCategory.name || !newCategory.status) {
      alert("Please fill in all fields.");
      return;
    }
    const date = new Date().toLocaleDateString("en-GB"); // Format: DD-MM-YYYY
    onAddCategory({
      ...newCategory,
      createdAt: date,
      updatedAt: date,
    });
    onClose(); // Đóng form sau khi thêm xong
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-1">Category Name</label>
            <input
              type="text"
              name="name"
              value={newCategory.name}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Status</label>
            <select
              name="status"
              value={newCategory.status}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md w-full p-2"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddCategory.propTypes = {
  onAddCategory: PropTypes.func.isRequired, // Hàm thêm category
  onClose: PropTypes.func.isRequired,      // Hàm đóng modal
};

export default AddCategory;
