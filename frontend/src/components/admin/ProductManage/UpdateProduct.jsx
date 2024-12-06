import { useState, useEffect } from "react";
import axios from "axios";

const UpdateProduct = ({
  showModal,
  setShowModal,
  product,
  onUpdateProduct,
}) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    image: "", // Chỉ lưu tên ảnh, không lưu file trực tiếp
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

  // Lấy thông tin sản phẩm hiện tại và cập nhật vào form
  useEffect(() => {
    if (showModal && product) {
      setUpdatedProduct({
        ...product, // Cập nhật thông tin sản phẩm vào state
        image: product.image, // Lưu tên ảnh vào state
        category: product.category?._id, // Lưu ID danh mục vào state
      });
    }
  }, [showModal, product]);


  // Hàm xử lý thay đổi thông tin trong form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      imageFile: file || null, // Chỉ lưu file mới nếu có
      image: file ? URL.createObjectURL(file) : prevProduct.image, 
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("name", updatedProduct.name);
    formData.append("price", updatedProduct.price);
    formData.append("sell_price", updatedProduct.sell_price);
    formData.append("category", updatedProduct.category);
    formData.append("displayType", updatedProduct.displayType);
    formData.append("displayHot", updatedProduct.displayHot);

    if (updatedProduct.imageFile) {
      formData.append("image", updatedProduct.imageFile); // Gửi ảnh mới
    } else if (updatedProduct.image) {
      formData.append("image", updatedProduct.image); // Gửi ảnh cũ nếu không có ảnh mới
    } else {
      formData.append("image", ""); // Đặt giá trị rỗng nếu không có ảnh
    }


    const response = await axios.put(
      `http://localhost:5000/api/products/${updatedProduct._id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    onUpdateProduct(response.data.data); // Cập nhật sản phẩm sau khi thành công
    setShowModal(false); // Đóng modal
  } catch (error) {
    console.error("Error updating product:", error.response?.data.message);
  }
};

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6">
        <h2 className="mb-4 text-lg font-bold">Update Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={updatedProduct.name || ""}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Image</label>
            <div className="mb-2">
              <img
                src={
                  updatedProduct.image.startsWith("http") ||
                  updatedProduct.image.startsWith("data") ||
                  updatedProduct.image.startsWith("/uploads/")
                    ? updatedProduct.image
                    : `/uploads/${updatedProduct.image}` // Đảm bảo đường dẫn ảnh hợp lệ
                }
                alt={updatedProduct.name}
                className="mb-2 h-40 w-40 rounded-md border object-cover"
              />
            </div>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium">Price</label>
              <input
                type="text"
                name="price"
                value={updatedProduct.price || ""}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium">Sell Price</label>
              <input
                type="text"
                name="sell_price"
                value={updatedProduct.sell_price || ""}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Category</label>
            <select
              value={updatedProduct.category}
              name="category"
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 p-2"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium">Display Type</label>
              <select
                value={updatedProduct.displayType}
                name="displayType"
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 p-2"
                required
              >
                <option value={1}>Active</option>
                <option value={2}>Inactive</option>
              </select>
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium">Display Hot</label>
              <select
                value={updatedProduct.displayHot}
                name="displayHot"
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 p-2"
                required
              >
                <option value={1}>Hot</option>
                <option value={2}>Not Hot</option>
              </select>
            </div>
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
