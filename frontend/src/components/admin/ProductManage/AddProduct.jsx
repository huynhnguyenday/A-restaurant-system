import React, { useState, useEffect } from "react";

const AddProduct = ({ showModal, setShowModal, onCreateProduct }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    price: "",
    sell_price: "",
    category: "",
    displayType: 1,
    displayHot: 1,
  });
  const [categories, setCategories] = useState([]);

  // Lấy danh sách danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        const data = await response.json();

        // Lọc danh mục có isActive = 1
        const activeCategories = data.data.filter(
          (category) => category.isActive === 1,
        );
        setCategories(activeCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateProduct(newProduct);
    setNewProduct({
      name: "",
      image: "",
      price: "",
      sell_price: "",
      category: "",
      displayType: 1,
      displayHot: 1,
    });
    setShowModal(false); 
  };

 
  const handleNumericInput = (value, field) => {
    if (/^\d*$/.test(value)) {
      setNewProduct({ ...newProduct, [field]: value });
    }
  };

  if (!showModal) return null; 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6">
        <h2 className="mb-4 text-lg font-bold">Create Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              required
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Image URL</label>
            <input
              type="text"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              required
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Price</label>
            <input
              type="text"
              value={newProduct.price}
              onChange={(e) => handleNumericInput(e.target.value, "price")}
              required
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Sell Price</label>
            <input
              type="text"
              value={newProduct.sell_price}
              onChange={(e) => handleNumericInput(e.target.value, "sell_price")}
              required
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Category</label>
            <select
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              required
              className="w-full rounded-md border border-gray-300 p-2"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Display Type</label>
            <select
              value={newProduct.displayType}
              onChange={(e) =>
                setNewProduct({ ...newProduct, displayType: +e.target.value })
              }
              required
              className="w-full rounded-md border border-gray-300 p-2"
            >
              <option value={1}>Active</option>
              <option value={2}>InActive</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Display Hot</label>
            <select
              value={newProduct.displayHot}
              onChange={(e) =>
                setNewProduct({ ...newProduct, displayHot: +e.target.value })
              }
              required
              className="w-full rounded-md border border-gray-300 p-2"
            >
              <option value={1}>Hot</option>
              <option value={2}>Not Hot</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="rounded-md bg-gray-200 px-4 py-2 text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
