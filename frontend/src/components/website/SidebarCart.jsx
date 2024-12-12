import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const SidebarCart = ({
  cartItems,
  removeItem,
  totalPrice,
  handleCartClick,
}) => {
  return (
    <div className="fixed right-0 top-0 z-[1000] flex h-full w-[350px] flex-col overflow-y-auto bg-white p-5 shadow-lg transition-transform ease-in-out">
      <button
        className="absolute right-2 top-2 cursor-pointer border-none bg-transparent text-xl text-[#909090] hover:text-black"
        onClick={handleCartClick}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <div className="mb-2 text-center text-2xl font-bold">Giỏ hàng</div>

      <div className="mb-5 border-b-2 border-[#ccc]"></div>

      <div className="flex-grow overflow-y-auto">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="relative mb-4 flex h-[110px] w-[290px] items-start rounded-lg border border-[#ddd] p-2"
          >
            <img
              src={item.img}
              alt={item.name}
              className="mr-4 h-[85px] w-[50px] object-cover"
            />
            <div className="flex flex-grow flex-col">
              <div className="mb-1 w-[170px] text-lg">{item.name}</div>
              <div className="w-[170px] text-sm text-gray-500">
                {item.quantity} x {item.price.toLocaleString()} ₫
              </div>
            </div>
            <button
              className="absolute right-2 top-[30px] cursor-pointer border-none bg-transparent text-xl text-[#a9a8a8] hover:text-black"
              onClick={() => removeItem(item.id)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-5 flex justify-between font-bold">
        <span>Tổng cộng</span>
        <span>
          {cartItems
            .reduce((total, item) => total + item.quantity * item.price, 0)
            .toLocaleString()}{" "}
          ₫
        </span>
      </div>
      <Link to="/payment" state={{ cartItems, totalPrice }}>
        <button
          className="mt-4 w-full cursor-pointer border-none bg-black p-2 text-white hover:bg-[#797a79]"
          onClick={handleCartClick}
        >
          Thanh toán
        </button>
      </Link>
    </div>
  );
};

export default SidebarCart;
