import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import "./DetailFood.css";
import axios from "axios";

const menuCategories = [
  "TẤT CẢ", "CAFÉ", "TRÀ", "TRÀ SỮA", "SINH TỐ", "TRÀ LẠNH"
];

const DetailFood = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null); // State lưu sản phẩm
  const [loading, setLoading] = useState(true); // State hiển thị trạng thái tải dữ liệu
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true); // Bắt đầu tải dữ liệu
        const response = await axios.get(`http://localhost:5000/api/mainPages/${id}`);
        if (response.data.success) {
          setProduct(response.data.data); // Lưu sản phẩm vào state
        } else {
          console.error("Sản phẩm không tồn tại hoặc API lỗi.");
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setLoading(false); // Kết thúc tải dữ liệu
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>; // Hiển thị trạng thái tải
  }

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
