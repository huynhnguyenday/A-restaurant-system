import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPen,
  faEye,
  faEyeSlash,
  faFire,
} from "@fortawesome/free-solid-svg-icons";

// Giả sử bạn đã có các hình ảnh sản phẩm
import imgfood1 from "../assets/imgfood1.png";
import imgfood2 from "../assets/imgfood2.png";
import imgfood3 from "../assets/imgfood3.png";
import imgfood4 from "../assets/imgfood4.png";
import imgfood5 from "../assets/imgfood5.png";
import imgfood6 from "../assets/imgfood6.png";
import imgfood7 from "../assets/imgfood7.png";

// Dữ liệu sản phẩm ban đầu
const initialProducts = [
  {
    id: 1,
    name: "Sinh tố dâu",
    image: imgfood1,
    sell_price: 20000,
    price: 25000,
    category: "SINH TỐ",
    createAT: "30-11-2024",
    updateAt: "30-11-2024",
    displayType: 1,
    displayHot: 1,
  },
  {
    id: 2,
    name: "Cà phê sữa",
    image: imgfood2,
    sell_price: 30000,
    price: 35000,
    category: "CAFÉ",
    createAT: "30-11-2024",
    updateAt: "30-11-2024",
    displayType: 2,
    displayHot: 2,
  },
  {
    id: 3,
    name: "Cà phê đen",
    image: imgfood3,
    sell_price: 40000,
    price: 45000,
    category: "CAFÉ",
    createAT: "30-11-2024",
    updateAt: "30-11-2024",
    displayType: 1,
    displayHot: 1,
  },
  {
    id: 4,
    name: "Trà sữa trân châu đường đen",
    image: imgfood4,
    sell_price: 50000,
    price: 55000,
    category: "TRÀ SỮA",
    createAT: "30-11-2024",
    updateAt: "30-11-2024",
    displayType: 2,
    displayHot: 2,
  },
  {
    id: 5,
    name: "Trà đào cam sả",
    image: imgfood5,
    sell_price: 60000,
    price: 65000,
    category: "TRÀ",
    createAT: "30-11-2024",
    updateAt: "30-11-2024",
    displayType: 1,
    displayHot: 1,
  },
  {
    id: 6,
    name: "Cam tắc xí muội",
    image: imgfood6,
    sell_price: 70000,
    price: 75000,
    category: "TRÀ LẠNH",
    createAT: "30-11-2024",
    updateAt: "30-11-2024",
    displayType: 2,
    displayHot: 2,
  },
  {
    id: 7,
    name: "Trà sữa ô long",
    image: imgfood7,
    sell_price: 80000,
    price: 85000,
    category: "TRÀ SỮA",
    createAT: "30-11-2024",
    updateAt: "30-11-2024",
    displayType: 1,
    displayHot: 1,
  },
];

const ManageProduct = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");

  // Tìm kiếm sản phẩm theo tên
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Hàm toggle trạng thái display
  const toggleDisplayType = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, displayType: product.displayType === 1 ? 2 : 1 }
          : product,
      ),
    );
  };

  // Hàm toggle trạng thái hot
  const toggleDisplayHot = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, displayHot: product.displayHot === 1 ? 2 : 1 }
          : product,
      ),
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-7xl rounded-lg bg-white p-6 shadow-lg">
        {/* Header Section */}
        <div className="mb-4 text-center text-2xl font-bold">
          Product Management
        </div>

        {/* Search and Add Product */}
        <div className="mb-4 flex items-center justify-between">
          <input
            type="text"
            placeholder="Search by Name or Category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-60 rounded-md border border-gray-300 p-2"
          />
          <div className="group relative">
            <button className="rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              <FontAwesomeIcon icon={faPlus} />
            </button>
            {/* Tooltip */}
            <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 px-4 py-2 text-sm text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              Add Product
            </span>
          </div>
        </div>

        {/* Product Table */}
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
                <th className="px-4 py-2 text-center">Sửa</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="px-4 py-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="flex h-20 w-auto justify-center rounded-md object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 font-bold">{product.name}</td>
                  <td className="px-4 py-2 text-center">
                    {product.category.toLowerCase()}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {product.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {product.sell_price.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-center">{product.createAT}</td>
                  <td className="px-4 py-2 text-center">{product.updateAt}</td>
                  <td className="px-4 py-2 text-center">
                    <FontAwesomeIcon
                      icon={faFire}
                      className={
                        product.displayHot === 1
                          ? "cursor-pointer text-2xl text-red-500"
                          : "cursor-pointer text-xl text-gray-400"
                      }
                      onClick={() => toggleDisplayHot(product.id)}
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => toggleDisplayType(product.id)}
                      className={
                        product.displayType === 1
                          ? "ml-2 rounded-md px-3 py-1 text-center text-2xl text-blue-500"
                          : "cursor-pointer text-xl text-gray-400"
                      }
                    >
                      <FontAwesomeIcon
                        icon={product.displayType === 1 ? faEye : faEyeSlash}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button className="rounded-md px-3 py-1 text-center text-blue-700 hover:rounded-full hover:bg-slate-300">
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
