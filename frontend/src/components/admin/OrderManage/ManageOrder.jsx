import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import DetailOrder from "./DetailOrder"; // Import DetailOrder component
import imgfood1 from "../../../../../backend/assets/imgfood1.png";
import imgfood2 from "../../../../../backend/assets/imgfood2.png";
import imgfood3 from "../../../../../backend/assets/imgfood3.png";
import imgfood4 from "../../../../../backend/assets/imgfood4.png";
import imgfood5 from "../../../../../backend/assets/imgfood5.png";
import imgfood6 from "../../../../../backend/assets/imgfood6.png";

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Placeholder orders data
  useEffect(() => {
    const placeholderOrders = [
      {
        id: "1",
        name: "Nguyen Van A",
        address: "123 Đường ABC, Quận 1, TP. HCM",
        number: "0987654321",
        email: "nguyenvana@example.com",
        note: "Giao vào buổi tối",
        paymentMethod: "COD", // Cash on delivery
        cart: [
          {
            product: {
              image: imgfood3,
              name: "Sản phẩm 1",
              sell_price: 100000,
            },
            quantity: 2,
            totalPrice: 200000,
          },
          {
            product: {
              image: imgfood4,
              name: "Sản phẩm 2",
              sell_price: 150000,
            },
            quantity: 1,
            totalPrice: 150000,
          },
        ],
      },
      {
        id: "2",
        name: "Tran Thi B",
        address: "456 Đường XYZ, Quận 2, TP. HCM",
        number: "0123456789",
        email: "tranthib@example.com",
        note: "Giao vào sáng mai",
        paymentMethod: "Online Payment", // Thanh toán trực tuyến
        cart: [
          {
            product: {
              image: imgfood1,
              name: "Sản phẩm 3",
              sell_price: 200000,
            },
            quantity: 1,
            totalPrice: 200000,
          },
          {
            product: {
              image: imgfood2,
              name: "Sản phẩm 4",
              sell_price: 300000,
            },
            quantity: 1,
            totalPrice: 300000,
          },
        ],
      },
      {
        id: "3",
        name: "Tran Thi C",
        address: "456 Đường XYZ, Quận 2, TP. HCM",
        number: "0123456789",
        email: "tranthicd@example.com",
        note: "Giao vào sáng mai Giao vào sáng maiGiao vào sáng maiGiao vào sáng maiGiao vào sáng maiGiao vào sáng maiGiao vào sáng maiGiao vào sáng maiGiao vào sáng maiGiao vào sáng maiGiao vào sáng maiGiao vào sáng maiGiao vào sáng mai",
        paymentMethod: "Online Payment", // Thanh toán trực tuyến
        cart: [
          {
            product: {
              image: imgfood5,
              name: "Sản phẩm 3",
              sell_price: 200000,
            },
            quantity: 1,
            totalPrice: 200000,
          },
          {
            product: {
              image: imgfood6,
              name: "Sản phẩm 4",
              sell_price: 300000,
            },
            quantity: 2,
            totalPrice: 300000,
          },
          {
            product: {
              image: imgfood6,
              name: "Sản phẩm 5",
              sell_price: 300000,
            },
            quantity: 1,
            totalPrice: 300000,
          },
          {
            product: {
              image: imgfood6,
              name: "Sản phẩm 6",
              sell_price: 300000,
            },
            quantity: 1,
            totalPrice: 300000,
          },
        ],
      },
    ];

    setOrders(placeholderOrders);
  }, []);

  // Filter orders based on search term
  const filteredOrders = orders.filter(
    (order) =>
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Handle showing order details
  const handleShowOrderDetail = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedOrder(null);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-7xl rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 text-center text-2xl font-bold">
          Order Management
        </div>

        {/* Search box */}
        <div className="mb-4 flex items-center justify-between">
          <input
            type="text"
            placeholder="Tìm kiếm bằng tên hoặc email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-60 rounded-md border border-gray-300 p-2"
          />
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-center">Name</th>
                <th className="px-4 py-3 text-center">Email</th>
                <th className="px-4 py-3 text-center">Payment Method</th>
                <th className="px-4 py-3 text-center">Edit</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="px-4 py-6 text-center font-bold">
                    {order.name}
                  </td>
                  <td className="px-4 py-6 text-center">{order.email}</td>
                  <td className="px-4 py-6 text-center">
                    {order.paymentMethod}
                  </td>
                  <td className="px-4 py-6 text-center text-xl">
                    <div className="group relative">
                      <button
                        onClick={() => handleShowOrderDetail(order)}
                        className="rounded-full px-3 py-1 text-blue-400 hover:bg-slate-300"
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                      <span className="absolute bottom-full left-1/2 mb-3 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 px-2 py-2 text-sm text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                        Edit Category
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Show Order Detail Modal */}
        {showDetailModal && (
          <DetailOrder order={selectedOrder} onClose={handleCloseDetailModal} />
        )}
      </div>
    </div>
  );
};

export default ManageOrder;
