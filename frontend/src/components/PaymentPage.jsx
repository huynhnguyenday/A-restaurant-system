import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./PaymentPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faShop } from "@fortawesome/free-solid-svg-icons";

const PaymentPage = () => {
  const location = useLocation();
  const { cartItems: initialCartItems, totalPrice: initialTotalPrice } = location.state || {};

  const [cartItems, setCartItems] = useState(initialCartItems || []);
  const [selectedPayment, setSelectedPayment] = useState("bank-transfer");

  if (!cartItems || cartItems.length === 0) {
    return (
      <button
        type="button"
        className="h-24 w-1/3 flex items-center justify-center text-2xl mx-auto mt-20 mb-20 bg-black text-white rounded-full"
      >
        <a href="/menu" className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faShop} className="text-4xl" /> 
          <span className="text-xl">QUAY TRỞ LẠI TRANG MUA SẮM</span>
        </a>
      </button>
    );
  }
  

  const handlePaymentOptionClick = (paymentId) => {
    setSelectedPayment(paymentId);
  };

  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const calculatedTotalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  

  return (
    <div className="container mx-auto my-10 px-4 pb-20">
      <div className="content-payment grid grid-cols-10 gap-6">
        {/* Phần thông tin khách hàng chiếm 6 cột */}
        <div className="payment-left col-span-10 sm:col-span-6">
          <h3 className="payment-left-title mb-4">Thông tin khách hàng</h3>
          <form className="input-group space-y-4">
            {/* Các trường thông tin */}
            <div className="input-payment">
              <input
                type="text"
                className="h-14 w-full rounded-2xl border border-gray-300 p-2"
                placeholder="Họ tên"
              />
            </div>
            <div className="input-payment">
              <input
                type="text"
                className="h-14 w-full rounded-2xl border border-gray-300 p-2"
                placeholder="Địa chỉ"
              />
            </div>
            <div className="flex h-14 justify-center space-x-4">
              <input
                type="tel"
                className="w-1/2 rounded-2xl border border-gray-300 p-2"
                placeholder="Số điện thoại"
              />
              <input
                type="email"
                className="w-1/2 rounded-2xl border border-gray-300 p-2"
                placeholder="Email"
              />
            </div>
            <div>
              <p className="input-note pb-1 pl-1 pt-1">Ghi chú đặt hàng</p>
              <input
                type="text"
                className="h-16 w-full rounded-2xl border border-gray-300 p-2"
                placeholder="Ghi chú (vd: giao lúc 10 giờ)"
              />
            </div>

            <div className="payment-method">
              <h4 className="payment-name mb-4 text-lg">
                Phương tiện thanh toán
              </h4>

              {/* Option 1 */}
              <button
                type="button"
                className={`payment-option mb-4 flex w-full cursor-pointer items-center rounded-2xl border p-4 ${selectedPayment === "bank-transfer" ? "selected" : ""}`}
                onClick={() => handlePaymentOptionClick("bank-transfer")}
              >
                <input
                  type="checkbox"
                  id="bank-transfer"
                  name="payment-method"
                  className="checkbox-method hidden"
                  checked={selectedPayment === "bank-transfer"}
                  readOnly
                />
                <div className="checkbox-circle"></div>
                <label
                  htmlFor="bank-transfer"
                  className="ml-4 flex-grow text-left text-gray-700"
                >
                  <p className="name-option">Chuyển khoản ngân hàng:</p>
                  <span className="detail-option">
                    Thực hiện thanh toán vào ngay tài khoản ngân hàng của chúng
                    tôi.
                  </span>
                </label>
              </button>

              {/* Option 2 */}
              <button
                type="button"
                className={`payment-option flex w-full cursor-pointer items-center rounded-2xl border p-4 ${selectedPayment === "cash-on-delivery" ? "selected" : ""}`}
                onClick={() => handlePaymentOptionClick("cash-on-delivery")}
              >
                <input
                  type="checkbox"
                  id="cash-on-delivery"
                  name="payment-method"
                  className="checkbox-method hidden"
                  checked={selectedPayment === "cash-on-delivery"}
                  readOnly
                />
                <div className="checkbox-circle"></div>
                <label
                  htmlFor="cash-on-delivery"
                  className="ml-4 flex-grow text-left text-gray-700"
                >
                  <p className="name-option">Trả tiền mặt khi nhận hàng:</p>
                  <span className="detail-option">
                    Trả tiền mặt khi giao hàng.
                  </span>
                </label>
              </button>
            </div>

            <button
              type="submit"
              className="button-submit h-14 w-full rounded-2xl "
            >
             ĐẶT NGAY {calculatedTotalPrice.toLocaleString()}₫
            </button>
          </form>
        </div>

        {/* Phần giỏ hàng và sản phẩm chiếm 4 cột */}
        <div className="col-span-10 sm:col-span-4 pl-8">
          <h3 className="name-option-payment mb-4 text-xl">Thông tin sản phẩm</h3>
          <div className="p-4 bg-white rounded-lg">
            {cartItems.map((item) => (
              <div key={item.id} className="relative flex items-center border-b pb-4 mb-4">
                <div className="flex-shrink-0 w-3/12">
                  <img src={item.img} alt={item.name} className="h-20% w-20% rounded-lg object-cover" />
                </div>
                <div className="w-6/12 px-4">
                  <span className="font-medium block truncate">{item.name}</span>
                  <div className="mt-2 flex items-center space-x-2 pt-6">
                    <button onClick={() => decreaseQuantity(item.id)} className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300">-</button>
                    <input type="text" value={item.quantity} readOnly className="w-12 text-center border rounded" />
                    <button onClick={() => increaseQuantity(item.id)} className="px-3 py-1 bg-gray-200 rounded-full  hover:bg-gray-300">+</button>
                  </div>
                </div>
                <div className="w-3/12 text-right relative">
                  <button
                    className="absolute top-0 right-0 text-2xl text-gray-400 hover:text-black"
                    onClick={() => removeItem(item.id)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                  <span className="text-black font-semibold block pt-16">{(item.quantity * item.price).toLocaleString()}₫</span>
                </div>
              </div>
            ))}
          </div>
          <div className="coupon-section mb-4 flex items-center space-x-2">
            <input
              type="text"
              className="coupon-input w-2/3 rounded-full border border-black p-3 placeholder-gray-400 text-gray-700"
              placeholder="Coupon code"
            />
            <button
              type="button"
              className="apply-coupon-btn h-12 w-1/3 rounded-full bg-black text-white"
            >
              Apply coupon
            </button>
          </div>
          <div className="subtotal ">
            <span>GIẢM GIÁ</span>
            <span>493,000₫</span>
          </div>
          <div className="total">
            <span>TỔNG CỘNG</span>
            <span>{calculatedTotalPrice.toLocaleString()}₫</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
