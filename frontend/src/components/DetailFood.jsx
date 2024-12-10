import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import "./DetailFood.css";
import axios from "axios";

const DetailFood = () => {
  const [quantity, setQuantity] = useState(1);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/mainPages/${id}`);
        if (response.data.success) {
          setProduct(response.data.data);
        } else {
          console.error("Sản phẩm không tồn tại hoặc API lỗi.");
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/mainPages/activeCategories");
        if (response.data.success) {
          setCategories(response.data.data);
        } else {
          console.error("Lỗi khi lấy danh mục.");
        }
      } catch (error) {
        console.error("Lỗi khi gọi API danh mục:", error);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (!product) {
    return <div>Sản phẩm không tồn tại.</div>;
  }

  const activeCategory = product.category.name; // Đảm bảo sản phẩm có thuộc tính category

  const handleCategoryClick = (categoryName) => {
    navigate(`/menu?category=${categoryName}`);
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

      <div className="detail-product flex-1 space-y-4">
        <h1 className="product-title text-3xl">{product.name}</h1>
        <p>
          <span className="sell-price text-lg font-bold">
            {product.sell_price.toLocaleString()}đ
          </span>
          <span className="price mr-4 text-gray-500 line-through">
            {product.price.toLocaleString()}đ
          </span>
        </p>
        <div className="separator"></div>
        <span className="quantity-name">số lượng: </span>
        <div className="quantity-picker">
          <button
            className="btn-minus-food"
            onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
          >
            -
          </button>
          <input
            type="text"
            value={quantity}
            onChange={handleQuantityChange}
            onBlur={handleBlur}
            className="quantity-input"
          />
          <button
            className="btn-plus-food"
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            +
          </button>
        </div>
        <button className="add-to-cart-btn">
          <FontAwesomeIcon icon={faBasketShopping} /> Thêm vào giỏ
        </button>
      </div>

      <div className="category flex-1">
        <h3 className="df-category-name">Danh mục thực đơn</h3>
        <ul className="menu-list">
          {categories.map((category) => (
            <li
              key={category._id}
              onClick={() => handleCategoryClick(category.name)}
              className={
                category.name === activeCategory ? "active-category" : ""
              }
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailFood;
