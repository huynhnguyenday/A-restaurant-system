import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faXmark } from "@fortawesome/free-solid-svg-icons";

const UpdateCoupon = ({ coupon, onClose }) => {
  const [updatedCoupon, setUpdatedCoupon] = useState(coupon);

  useEffect(() => {
    setUpdatedCoupon(coupon); // Update the form whenever the coupon prop changes
  }, [coupon]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCoupon((prevCoupon) => ({
      ...prevCoupon,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Updated Coupon Data:", updatedCoupon);
    onClose(); // Close the modal after saving
  };

  const handleCancel = () => {
    onClose(); // Close the modal without saving
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 text-center text-2xl font-bold">
          Chỉnh sửa Coupon
        </div>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="mb-2 block text-lg font-medium">Mã Coupon</label>
            <input
              type="text"
              name="code"
              value={updatedCoupon.code}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 p-2"
              placeholder="Nhập mã coupon"
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-lg font-medium">
              Giá trị giảm
            </label>
            <input
              type="number"
              name="discountValue"
              value={updatedCoupon.discountValue}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 p-2"
              placeholder="Nhập giá trị giảm"
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-lg font-medium">Số lượng</label>
            <input
              type="number"
              name="quantity"
              value={updatedCoupon.quantity}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 p-2"
              placeholder="Nhập số lượng coupon"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="text-red-500 hover:text-red-700"
            >
              <FontAwesomeIcon icon={faXmark} /> Hủy
            </button>
            <button
              type="submit"
              className="flex items-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              <FontAwesomeIcon icon={faSave} /> Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCoupon;
