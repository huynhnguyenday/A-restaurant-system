import { useState } from "react";
import PropTypes from "prop-types";

const AddCategory = ({ onAddCategory, onClose }) => {
  const [newCategory, setNewCategory] = useState({
    name: "",
    isActive: 1, // Mặc định là 1 (Active)
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: parseInt(value, 10) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCategory.name || !newCategory.isActive) {
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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 flex justify-center text-4xl font-bold">
          Add New Category
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-1 block font-medium">Category Name</label>
            <input
              type="text"
              name="name"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block font-medium">Active Status</label>
            <select
              name="isActive"
              value={newCategory.isActive}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 p-2"
            >
              <option value={1}>Active</option>
              <option value={2}>Inactive</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
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
  onAddCategory: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddCategory;
