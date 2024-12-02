import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import imgfood1 from "../assets/imgfood1.png";
import imgfood2 from "../assets/imgfood2.png";
import imgfood3 from "../assets/imgfood3.png";
import imgfood4 from "../assets/imgfood4.png";
import imgfood5 from "../assets/imgfood5.png";
import imgfood6 from "../assets/imgfood6.png";
import imgfood7 from "../assets/imgfood7.png";
import "./DetailFood.css";

const products = [
  { id: 1, name: "Sinh tố dâu", image: imgfood1, sell_price: 20000, price: 25000, category: "SINH TỐ" },
  { id: 2, name: "Cà phê sữa", image: imgfood2, sell_price: 30000, price: 35000, category: "CAFÉ" },
  { id: 3, name: "Cà phê đen", image: imgfood3, sell_price: 40000, price: 45000, category: "CAFÉ" },
  { id: 4, name: "Trà sữa trân châu đường đen", image: imgfood4, sell_price: 50000, price: 55000, category: "TRÀ SỮA" },
  { id: 5, name: "Trà đào cam sả", image: imgfood5, sell_price: 60000, price: 65000, category: "TRÀ" },
  { id: 6, name: "Cam tắc xí muội", image: imgfood6, sell_price: 70000, price: 75000, category: "TRÀ LẠNH" },
  { id: 7, name: "Trà sữa ô long", image: imgfood7, sell_price: 80000, price: 85000, category: "TRÀ SỮA" },
];

const menuCategories = [
  "TẤT CẢ", "CAFÉ", "TRÀ", "TRÀ SỮA", "SINH TỐ", "TRÀ LẠNH"
];

const DetailFood = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div>Sản phẩm không tồn tại.</div>;
  }

  const activeCategory = product.category; // Identify the active category based on the product's category

  const handleCategoryClick = (category) => {
    navigate(`/menu?category=${category}`); // Chuyển hướng đến Menu với query parameter category
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setQuantity("");
    } else {
      const numericValue = parseInt(value, 10);
      if (!isNaN(numericValue) && numericValue >= 1) {
        setQuantity(numericValue);
      }
    }
  };

  const handleBlur = () => {
    if (quantity === "") {
      setQuantity(1);
    }
  };

  return (
    <div className="container mx-auto flex space-x-8 pb-40">
      <div className="food-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="flex-1 space-y-4 detail-product">
        <h1 className="text-3xl product-title">{product.name}</h1>
        <p>
          <span className="text-lg font-bold sell-price">{product.sell_price.toLocaleString()}đ</span>
          <span className="line-through text-gray-500 mr-4 price">{product.price.toLocaleString()}đ</span>
        </p>
        <div className="separator"></div>
        <span className="quantity-name">số lượng: </span>
        <div className="quantity-picker">
          <button className="btn-minus-food" onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}>-</button>
          <input
            type="text"
            value={quantity}
            onChange={handleQuantityChange}
            onBlur={handleBlur}
            className="quantity-input "
          />
          <button className="btn-plus-food" onClick={() => setQuantity((prev) => prev + 1)}>+</button>
        </div>
        <button className="add-to-cart-btn">
          <FontAwesomeIcon icon={faBasketShopping} /> Thêm vào giỏ
        </button>
      </div>

      <div className="flex-1 category">
        <h3 className="df-category-name">Danh mục thực đơn</h3>
        <ul className="menu-list">
          {menuCategories.map((category) => (
            <li
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={category === activeCategory ? "active-category" : ""}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailFood;
