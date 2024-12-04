import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const UpdateCategory = ({ category, onClose, onUpdateCategory }) => {
  const [updatedCategory, setUpdatedCategory] = useState(category);

  useEffect(() => {
    setUpdatedCategory(category);
  }, [category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCategory({ ...updatedCategory, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!updatedCategory.name) {
      alert("Please fill in all fields.");
      return;
    }

    axios
      .put(`http://localhost:5000/api/categories/${updatedCategory._id}`, updatedCategory)
      .then((response) => {
        onUpdateCategory(updatedCategory); // Cập nhật danh mục trong state cha
        onClose(); // Đóng modal
      })
      .catch((error) => {
        console.error("There was an error updating the category:", error);
      });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Update Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-1">Category Name</label>
            <input
              type="text"
              name="name"
              value={updatedCategory.name}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md w-full p-2"
            />
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
              Update Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

UpdateCategory.propTypes = {
  category: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateCategory: PropTypes.func.isRequired,
};

export default UpdateCategory;
