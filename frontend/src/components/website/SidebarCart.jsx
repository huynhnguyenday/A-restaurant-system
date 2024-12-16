import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const SidebarCart = ({ handleCartClick }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Lấy giỏ hàng từ sessionStorage khi component được mount
    const tempCart = JSON.parse(sessionStorage.getItem("tempCart")) || [];
    setCartItems(tempCart);

    // Tính toán tổng giá trị giỏ hàng
    const total = tempCart.reduce(
      (total, item) => total + item.quantity * item.price,
      0,
    );
    setTotalPrice(total);
  }, []);

  const removeItem = (id) => {
    // Xóa sản phẩm khỏi giỏ hàng tạm thời
    const updatedCart = cartItems.filter((item) => item.productId !== id);
    setCartItems(updatedCart);
    sessionStorage.setItem("tempCart", JSON.stringify(updatedCart));

    // Cập nhật lại tổng giá trị
    const total = updatedCart.reduce(
      (total, item) => total + item.quantity * item.price,
      0,
    );
    setTotalPrice(total);
  };

  const handlePaymentClick = () => {
    // In ra thông tin giỏ hàng và tổng giá trị khi nhấn thanh toán
    console.log("Thông tin giỏ hàng:", cartItems);
    console.log("Tổng giá trị giỏ hàng:", totalPrice);
  };

  return (
    <div className="fixed right-0 top-0 z-[1000] flex h-full w-[350px] flex-col overflow-y-auto bg-white p-5 shadow-lg transition-transform ease-in-out">
      <button
        className="absolute right-5 top-2 cursor-pointer border-none bg-transparent text-3xl text-[#909090] hover:text-black"
        onClick={handleCartClick}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <div className="mb-2 text-center text-2xl font-bold text-[#633c02]">
        Giỏ hàng
      </div>

      <div className="mb-5 border-b-2 border-[#ccc]"></div>

      <div className="flex-grow overflow-y-auto">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.productId}
              className="relative mb-4 flex h-[110px] w-[290px] items-start rounded-lg border border-[#ddd] p-2"
            >
              <img
                src={item.img}
                alt={item.name}
                className="mr-4 h-[85px] w-[50px] object-cover"
              />
              <div className="flex flex-grow flex-col">
                <div className="mt-3 h-[50px] w-[170px] font-josefin text-xl text-[#00561e] font-bold">
                  {item.name}
                </div>
                <div className="w-[170px] font-josefin text-base text-black">
                  {item.quantity} x {item.price.toLocaleString()} ₫
                </div>
              </div>
              <button
                className="absolute right-3 top-[30px] cursor-pointer border-none bg-transparent text-2xl text-[#a9a8a8] hover:text-black"
                onClick={() => removeItem(item.productId)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center font-josefin text-lg font-bold text-black">
            Bạn chưa thêm sản phẩm vào giỏ hàng
          </p>
        )}
      </div>

      <div className="mt-5 flex justify-between font-bold">
        <span className="text-xl">Tổng cộng</span>
        <span className="text-xl">{totalPrice.toLocaleString()}đ</span>
      </div>
      <Link to="/payment" state={{ cartItems, totalPrice }}>
        <button
          className="mt-4 w-full cursor-pointer border-none bg-black p-2 text-white hover:bg-[#797a79]"
          onClick={() => {
            handleCartClick();
            handlePaymentClick();
          }}
        >
          Thanh toán
        </button>
      </Link>
    </div>
  );
};

export default SidebarCart;
