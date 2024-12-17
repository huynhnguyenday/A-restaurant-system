import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEye } from "@fortawesome/free-solid-svg-icons";
import UpdateCoupon from "./UpdateCoupon"; // Import the UpdateCoupon form

const ManageCoupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // Placeholder coupons data
  useEffect(() => {
    const placeholderCoupons = [
      { id: "C001", code: "10k", discountValue: 10000, quantity: 10 },
      { id: "C002", code: "20k", discountValue: 20000, quantity: 10 },
      { id: "C003", code: "30k", discountValue: 30000, quantity: 10 },
    ];

    setCoupons(placeholderCoupons);
  }, []);

  // Filter coupons based on search term
  const filteredCoupons = coupons.filter((coupon) =>
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedCoupon(null);
  };

  const handleShowCouponDetail = (coupon) => {
    setSelectedCoupon(coupon);
    setShowDetailModal(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-5xl rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 text-center text-2xl font-bold">
          Quản lý Coupon
        </div>

        {/* Search box */}
        <div className="mb-4 flex items-center justify-between">
          <input
            type="text"
            placeholder="Tìm kiếm coupon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-60 rounded-md border-gray-300 p-2"
          />
          <div className="group relative">
            <button className="rounded-full bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        {/* Coupons Table */}
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-center">Mã Coupon</th>
                <th className="px-4 py-3 text-center">Giá trị giảm</th>
                <th className="px-4 py-3 text-center">Số lượng</th>
                <th className="px-4 py-3 text-center">Chỉnh sửa</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoupons.map((coupon) => (
                <tr key={coupon.id} className="bg-white">
                  <td className="px-4 py-6 text-center">{coupon.code}</td>
                  <td className="px-4 py-6 text-center">
                    {coupon.discountValue}
                  </td>
                  <td className="px-4 py-6 text-center">{coupon.quantity}</td>
                  <td className="px-4 py-6 text-center text-xl">
                    <button
                      onClick={() => handleShowCouponDetail(coupon)}
                      className="px-3 py-1 text-blue-400 hover:bg-slate-300"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Show coupon Detail Modal */}
        {showDetailModal && (
          <UpdateCoupon
            coupon={selectedCoupon}
            onClose={handleCloseDetailModal}
          />
        )}
      </div>
    </div>
  );
};

export default ManageCoupon;
