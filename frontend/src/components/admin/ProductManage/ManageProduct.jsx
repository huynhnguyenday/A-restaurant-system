import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPen,
  faEye,
  faEyeSlash,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct"; // Import UpdateProduct component

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false); // Separate state for adding product modal
  const [showUpdateModal, setShowUpdateModal] = useState(false); // Separate state for updating product modal
  const [selectedProduct, setSelectedProduct] = useState(null); // State to track selected product for editing

  // Tách riêng hàm fetchProducts để tái sử dụng
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products"); // Đường dẫn API
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Gọi API khi component được render lần đầu
  useEffect(() => {
    fetchProducts();
  }, []);

  // Reload khi showModal thay đổi thành false
  useEffect(() => {
    if (!showAddModal && !showUpdateModal) {
      fetchProducts();
    }
  }, [showAddModal, showUpdateModal]);

  const handleCreateProduct = async (product) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        product,
      );
      setProducts([...products, response.data.data]);
      setShowAddModal(false);
    } catch (error) {
      console.error("Error creating product:", error.response.data.message);
    }
  };

  // Lọc sản phẩm theo từ khóa tìm kiếm
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Hàm toggle trạng thái display
  const toggleDisplayType = async (id) => {
    try {
      const updatedProducts = products.map((product) =>
        product._id === id
          ? { ...product, displayType: product.displayType === 1 ? 2 : 1 }
          : product,
      );
      setProducts(updatedProducts);

      // Gửi yêu cầu cập nhật API
      await axios.put(`http://localhost:5000/api/products/${id}`, {
        displayType: updatedProducts.find((p) => p._id === id).displayType,
      });
    } catch (error) {
      console.error("Error updating display type:", error);
    }
  };

  // Hàm toggle trạng thái hot
  const toggleDisplayHot = async (id) => {
    try {
      const updatedProducts = products.map((product) =>
        product._id === id
          ? { ...product, displayHot: product.displayHot === 1 ? 2 : 1 }
          : product,
      );
      setProducts(updatedProducts);

      // Gửi yêu cầu cập nhật API
      await axios.put(`http://localhost:5000/api/products/${id}`, {
        displayHot: updatedProducts.find((p) => p._id === id).displayHot,
      });
    } catch (error) {
      console.error("Error updating display hot:", error);
    }
  };

  // Handle the edit product action (open the update modal)
  const handleEditProduct = (product) => {
    setSelectedProduct(product); // Set the selected product to be edited
    setShowUpdateModal(true); // Show the update modal
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-7xl rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 text-center text-2xl font-bold">
          Product Management
        </div>

        {/* Tìm kiếm sản phẩm */}
        <div className="mb-4 flex items-center justify-between">
          <input
            type="text"
            placeholder="Search by Name or Category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-60 rounded-md border border-gray-300 p-2"
          />
          <button
            onClick={() => setShowAddModal(true)} // Hiển thị modal tạo sản phẩm
            className="rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        {/* Component AddProduct */}
        {showAddModal && (
          <AddProduct
            showModal={showAddModal}
            setShowModal={setShowAddModal}
            onCreateProduct={handleCreateProduct}
          />
        )}

        {/* Component UpdateProduct */}
        {selectedProduct && showUpdateModal && (
          <UpdateProduct
            showModal={showUpdateModal}
            setShowModal={setShowUpdateModal}
            product={selectedProduct}
            onUpdateProduct={(updatedProduct) => {
              setProducts((prevProducts) =>
                prevProducts.map((p) =>
                  p._id === updatedProduct._id ? updatedProduct : p,
                ),
              );
              setShowUpdateModal(false);
            }}
          />
        )}

        {/* Bảng sản phẩm */}
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-center">Image</th>
                <th className="px-4 py-2 text-left">Product Name</th>
                <th className="px-4 py-2 text-center">Category</th>
                <th className="px-4 py-2 text-center">Price</th>
                <th className="px-4 py-2 text-center">Sell Price</th>
                <th className="px-4 py-2 text-center">Date Create</th>
                <th className="px-4 py-2 text-center">Date Update</th>
                <th className="px-4 py-2 text-center">Hot</th>
                <th className="px-4 py-2 text-center">Display</th>
                <th className="px-4 py-2 text-center">Edit</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product._id} className="border-b">
                  <td className="px-4 py-2">
                    <img
                      src={`${product.image}`}
                      alt={product.name}
                      className="h-20 w-auto rounded-md object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 font-bold">{product.name}</td>
                  <td className="px-4 py-2 text-center">
                    {product.category?.name || "chưa có"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {product.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {product.sell_price.toLocaleString()}
                  </td>
                  <td className="px-4 py-6 text-center">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-6 text-center">
                    {new Date(product.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <FontAwesomeIcon
                      icon={faFire}
                      className={
                        product.displayHot === 1
                          ? "cursor-pointer text-2xl text-red-500"
                          : "cursor-pointer text-xl text-gray-400"
                      }
                      onClick={() => toggleDisplayHot(product._id)}
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <FontAwesomeIcon
                      icon={product.displayType === 1 ? faEye : faEyeSlash}
                      className={
                        product.displayType === 1
                          ? "cursor-pointer text-2xl text-blue-500"
                          : "cursor-pointer text-xl text-gray-400"
                      }
                      onClick={() => toggleDisplayType(product._id)}
                    />
                  </td>
                  <td className="px-4 py-2 text-center text-xl">
                    <button
                      className="rounded-md p-2 hover:bg-blue-100"
                      onClick={() => handleEditProduct(product)} // Edit action
                    >
                      <FontAwesomeIcon icon={faPen} />
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

export default ManageProduct;
