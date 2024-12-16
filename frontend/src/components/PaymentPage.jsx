import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faShop } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const PaymentPage = () => {
  const location = useLocation();
  const { cartItems: initialCartItems } = location.state || {};

  const [cartItems, setCartItems] = useState(initialCartItems || []);
  const [selectedPayment, setSelectedPayment] = useState(1);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [validCoupons, setValidCoupons] = useState([]); // Dữ liệu coupons từ API

  useEffect(() => {
    // Gọi API để lấy danh sách coupon
    const fetchCoupons = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/coupons"); // Thay URL bằng API của bạn
        setValidCoupons(response.data.data); // Cập nhật state từ API
      } catch (error) {
        console.error("Lỗi khi lấy danh sách coupon:", error);
      }
    };

    fetchCoupons();
  }, []);

  if (!cartItems || cartItems.length === 0) {
    return (
      <button
        type="button"
        className="mx-auto mb-20 mt-20 flex h-24 w-1/3 items-center justify-center rounded-full bg-black text-2xl text-white"
      >
        <a href="/menu" className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faShop} className="text-4xl" />
          <span className="text-xl">QUAY TRỞ LẠI TRANG MUA SẮM</span>
        </a>
      </button>
    );
  }

  const handlePaymentOptionClick = (paymentmethod) => {
    setSelectedPayment(paymentmethod);
  };

  const decreaseQuantity = (productId) => {
    setCartItems(
      cartItems.map((item) =>
        item.productId === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const increaseQuantity = (productId) => {
    setCartItems(
      cartItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const removeItem = (productId) => {
    setCartItems(cartItems.filter((item) => item.productId !== productId));
  };

  const calculatedTotalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );

  const handleApplyCoupon = () => {
    const coupon = validCoupons.find((c) => c.code === couponCode);
    if (coupon) {
      setDiscount(coupon.discountValue);
    } else {
      alert("Mã coupon không hợp lệ");
      setDiscount(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the cart data with correct product ids
    const orderData = {
      name: e.target.name.value,
      address: e.target.address.value,
      number: e.target.number.value,
      email: e.target.email.value,
      note: e.target.note.value,
      paymentMethod: selectedPayment === 1 ? "Online Payment" : "COD",
      discount: discount,
      finalPrice: finalPrice,
      cart: cartItems.map((item) => ({
        productId: item.productId, // Đây là nơi bạn gửi id sản phẩm
        quantity: item.quantity,
        price: item.price,
      })),
    };

    // Log toàn bộ dữ liệu orderData để kiểm tra
    console.log("Dữ liệu gửi lên server:", orderData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/orders",
        orderData,
      );
      toast(response.data.message);
      sessionStorage.removeItem("tempCart"); //làm trống giỏ hàng
      window.location.href = "/order-success"; // Redirect after successful order
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
      alert("Đã có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const finalPrice = calculatedTotalPrice - discount;
  return (
    <div className="mx-auto my-10 max-w-[1200px] px-4 pb-20">
      <div className="grid grid-cols-1 gap-6 pt-12 sm:grid-cols-10">
        {/* Phần thông tin khách hàng chiếm 6 cột */}
        <div className="payment-left order-2 col-span-10 sm:order-1 sm:col-span-6">
          <h3 className="mb-4 pt-4 font-josefin text-4xl font-bold">
            Thông tin khách hàng
          </h3>
          <form onSubmit={handleSubmit} className="input-group space-y-4">
            {/* Các trường thông tin */}
            <div className="input-payment">
              <input
                type="text"
                name="name"
                className="h-16 w-full rounded-2xl border border-gray-300 p-2 font-josefin"
                placeholder="Họ tên"
                required
              />
            </div>
            <div className="input-payment">
              <input
                type="text"
                name="address"
                className="h-16 w-full rounded-2xl border border-gray-300 p-2 pt-3 font-josefin"
                placeholder="Địa chỉ"
                required
              />
            </div>
            <div className="flex h-16 justify-center space-x-4 font-josefin">
              <input
                type="tel"
                name="number"
                className="w-1/2 rounded-2xl border border-gray-300 p-2 font-josefin"
                placeholder="Số điện thoại"
                required
              />
              <input
                type="email"
                name="email"
                className="w-1/2 rounded-2xl border border-gray-300 p-2 font-josefin"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <p className="pb-1 pl-1 pt-1 font-josefin text-2xl font-bold">
                Ghi chú đặt hàng
              </p>
              <input
                type="text"
                name="note"
                className="h-16 w-full rounded-2xl border border-gray-300 p-2 font-josefin"
                placeholder="Ghi chú (vd: giao lúc 10 giờ)"
              />
            </div>

            {/* Phương thức thanh toán */}
            <div className="payment-method">
              <h4 className="mb-4 py-3 font-josefin text-4xl font-bold">
                Phương tiện thanh toán
              </h4>

              {/* Các lựa chọn phương thức thanh toán */}
              <button
                type="button"
                className={`payment-option mb-4 flex w-full cursor-pointer items-center rounded-2xl border p-4 transition-colors duration-300 hover:text-black ${
                  selectedPayment === 1 ? "border-[#2f5acf]" : "border-gray-300"
                }`}
                onClick={() => handlePaymentOptionClick(1)}
              >
                <input
                  type="checkbox"
                  id="bank-transfer"
                  name="payment-method"
                  className="checkbox-method hidden"
                  checked={selectedPayment === 1}
                  readOnly
                />
                <div
                  className={`checkbox-circle relative flex h-[20px] w-[20px] items-center justify-center rounded-full border-2 bg-white transition-colors duration-300 ${
                    selectedPayment === 1
                      ? "border-[#2f5acf]"
                      : "border-gray-300"
                  }`}
                >
                  {selectedPayment === 1 && (
                    <div className="h-[10px] w-[10px] rounded-full bg-[#2f5acf]"></div>
                  )}
                </div>
                <label
                  htmlFor="bank-transfer"
                  className="ml-4 flex-grow text-left text-gray-700"
                >
                  <p
                    className={`name-option font-josefin text-[20px] font-semibold ${
                      selectedPayment === 1 ? "text-black" : "text-[#8e8e8e]"
                    }`}
                  >
                    Chuyển khoản ngân hàng:
                  </p>
                  <span
                    className={`detail-option font-josefin text-[14px] ${
                      selectedPayment === 1 ? "text-black" : "text-[#8e8e8e]"
                    }`}
                  >
                    Thực hiện thanh toán bằng ví điện tử.
                  </span>
                </label>
              </button>

              {/* Option 2 */}
              <button
                type="button"
                className={`payment-option flex w-full cursor-pointer items-center rounded-2xl border p-4 transition-colors duration-300 hover:text-black ${
                  selectedPayment === 2 ? "border-[#2f5acf]" : "border-gray-300"
                }`}
                onClick={() => handlePaymentOptionClick(2)}
              >
                <input
                  type="checkbox"
                  id="cash-on-delivery"
                  name="payment-method"
                  className="checkbox-method hidden"
                  checked={selectedPayment === 2}
                  readOnly
                />
                <div
                  className={`checkbox-circle relative flex h-[20px] w-[20px] items-center justify-center rounded-full border-2 bg-white transition-colors duration-300 ${
                    selectedPayment === 2
                      ? "border-[#2f5acf]"
                      : "border-gray-300"
                  }`}
                >
                  {selectedPayment === 2 && (
                    <div className="h-[10px] w-[10px] rounded-full bg-[#2f5acf]"></div>
                  )}
                </div>
                <label
                  htmlFor="cash-on-delivery"
                  className="ml-4 flex-grow text-left text-gray-700"
                >
                  <p
                    className={`name-option font-josefin text-[20px] font-semibold ${
                      selectedPayment === 2 ? "text-black" : "text-[#8e8e8e]"
                    }`}
                  >
                    Trả tiền mặt khi nhận hàng:
                  </p>
                  <span
                    className={`detail-option font-josefin text-[14px] ${
                      selectedPayment === 2 ? "text-black" : "text-[#8e8e8e]"
                    }`}
                  >
                    Trả tiền mặt khi giao hàng.
                  </span>
                </label>
              </button>
            </div>

            <button
              type="submit"
              className="mt-8 h-16 w-full rounded-2xl bg-black px-4 font-josefin text-xl font-bold text-white hover:bg-[#494949]"
            >
              ĐẶT NGAY {finalPrice.toLocaleString()}₫
            </button>
          </form>
        </div>
        {/* Phần thông tin giỏ hàng chiếm 4 cột */}
        <div className="order-1 col-span-10 sm:order-2 sm:col-span-4">
          <h3 className="name-option-payment mb-4 pt-4 font-josefin text-[32px] text-xl font-bold">
            Thông tin sản phẩm
          </h3>
          <div className="rounded-lg bg-white p-4">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="relative mb-4 flex items-center border-b pb-4"
              >
                <div className="w-3/12 flex-shrink-0">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-20% w-20% rounded-lg object-cover"
                  />
                </div>
                <div className="w-6/12 px-4">
                  <span className="block truncate font-medium">
                    {item.name}
                  </span>
                  <div className="mt-2 flex items-center space-x-2 pt-6">
                    <button
                      onClick={() => decreaseQuantity(item.productId)}
                      className="rounded-full bg-gray-200 px-3 py-1 hover:bg-gray-300"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="w-12 rounded border text-center"
                    />
                    <button
                      onClick={() => increaseQuantity(item.productId)}
                      className="rounded-full bg-gray-200 px-3 py-1 hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="relative w-3/12 text-right">
                  <button
                    className="absolute right-0 top-0 text-2xl text-gray-400 hover:text-black"
                    onClick={() => removeItem(item.productId)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                  <span className="block pt-16 font-semibold text-black">
                    {(item.quantity * item.price).toLocaleString()}₫
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="coupon-section mb-4 flex items-center space-x-2">
            <input
              type="text"
              className="coupon-input w-2/3 rounded-full border border-black p-3 text-gray-700 placeholder-gray-400"
              placeholder="Coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button
              type="button"
              className="apply-coupon-btn h-12 w-1/3 rounded-full bg-black text-white"
              onClick={handleApplyCoupon}
            >
              Apply coupon
            </button>
          </div>
          <div className="mb-[5px] flex justify-between font-josefin text-[18px] font-semibold">
            <span>GIẢM GIÁ</span>
            <span>{discount.toLocaleString()}₫</span>
          </div>
          <div className="mb-[5px] flex justify-between font-josefin text-[18px] font-semibold">
            <span>TỔNG CỘNG</span>
            <span>{finalPrice.toLocaleString()}₫</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
