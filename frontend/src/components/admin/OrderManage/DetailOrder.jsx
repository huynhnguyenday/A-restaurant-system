import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const DetailOrder = ({ order, onClose }) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    number: "",
    address: "",
    email: "",
    paymentMethod: "",
    note: "",
    discount:"",
  });

  // Lấy thông tin đơn hàng vào state khi đơn hàng thay đổi
  useEffect(() => {
    if (order) {
      setCustomerInfo({
        name: order.name || "",
        number: order.number || "",
        address: order.address || "",
        email: order.email || "",
        paymentMethod: order.paymentMethod || "",
        note: order.note || "",
        discount: order.discount || "",
      });
    }
  }, [order]);

  // Xử lý thay đổi trong các input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="relative h-[570px] w-full max-w-7xl rounded-lg bg-white p-6 shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-3 text-3xl text-gray-400 hover:text-black"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        {/* Order Details */}
        <h2 className="mb-8 text-center text-3xl font-bold">
          Chi tiết đơn hàng của {order.name}
        </h2>

        <form>
          <div className="flex space-x-6">
            {/* Left Section - Customer Information */}
            <div className="w-2/5">
              <label className="mb-2 block text-xl font-medium">
                Tên khách hàng
              </label>
              <input
                type="text"
                name="name"
                value={customerInfo.name}
                onChange={handleInputChange}
                className="mb-4 w-full rounded-md border border-gray-300 p-2"
              />

              <label className="mb-2 block text-xl font-medium">
                Số điện thoại
              </label>
              <input
                type="text"
                name="number"
                value={customerInfo.number}
                onChange={handleInputChange}
                className="mb-4 w-full rounded-md border border-gray-300 p-2"
              />

              <label className="mb-2 block text-xl font-medium">Địa chỉ</label>
              <input
                type="text"
                name="address"
                value={customerInfo.address}
                onChange={handleInputChange}
                className="mb-4 w-full rounded-md border border-gray-300 p-2"
              />

              <label className="mb-2 block text-xl font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={customerInfo.email}
                onChange={handleInputChange}
                className="mb-4 w-full rounded-md border border-gray-300 p-2"
              />
            </div>

            {/* Center Section - Payment Method and Note */}
            <div className="w-1/3">
              <label className="mb-2 block text-xl font-medium">
                Phương thức thanh toán
              </label>
              <select
                name="paymentMethod"
                value={customerInfo.paymentMethod}
                onChange={handleInputChange}
                className="mb-4 w-1/2 rounded-md border border-gray-300 p-2"
              >
                <option value="Online Payment">Online Payment</option>
                <option value="COD">COD</option>
              </select>

              <label className="mb-2 block text-xl font-medium">Ghi chú</label>
              <textarea
                name="note"
                value={customerInfo.note}
                onChange={handleInputChange}
                maxLength={500}
                className="mb-4 max-h-64 w-full overflow-y-auto rounded-md border border-gray-300 p-2"
              />
            </div>

            {/* Right Section - Product List */}
            <div className="w-1/3">
              <h3 className="mb-2 text-xl font-semibold">Chi tiết sản phẩm</h3>
              <div className="max-h-80 space-y-4 overflow-y-auto">
                {order.cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center rounded-lg border p-4 shadow-sm"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="mr-4 h-20 w-auto rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-josefin text-lg font-semibold text-[#00561e]">
                        {item.product.name}
                      </p>
                      <div className="mt-5 flex justify-between">
                        <p className="font-josefin">
                          số lượng: {item.quantity}
                        </p>
                        <p className="font-josefin">
                          Tổng: {item.totalPrice.toLocaleString()} ₫
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex justify-between font-bold">
                <span className="font-josefin text-lg">Giảm giá:</span>
                <span className="font-josefin text-lg">
                  <p>{order.discount.toLocaleString()} ₫</p>
                </span>
              </div>
              {/* Total Price */}
              <div className="mt-2 flex justify-between font-bold">
                <span className="font-josefin text-xl">Tổng cộng:</span>
                <span className="font-josefin text-xl">
                  <p>{order.finalPrice.toLocaleString()} ₫</p>
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailOrder;
