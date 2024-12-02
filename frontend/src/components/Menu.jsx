import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ModalProduct from "./ModalProduct"; // Import ModalProduct component
import "./Menu.css";

// Import hình ảnh
import imgfood1 from "../assets/imgfood1.png";
import imgfood2 from "../assets/imgfood2.png";
import imgfood3 from "../assets/imgfood3.png";
import imgfood4 from "../assets/imgfood4.png";
import imgfood5 from "../assets/imgfood5.png";
import imgfood6 from "../assets/imgfood6.png";
import imgfood7 from "../assets/imgfood7.png";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("TẤT CẢ"); // Danh mục đang chọn
  const [favorites, setFavorites] = useState({}); // Danh sách yêu thích
  const [selectedProduct, setSelectedProduct] = useState(null); // Sản phẩm đã chọn
  const [quantity, setQuantity] = useState(1); // Số lượng sản phẩm trong Modal
  const navigate = useNavigate();
  const location = useLocation();

  // Danh sách sản phẩm
  const products = [
    { id: 1, name: "Sinh tố dâu", image: imgfood1, sell_price: 20000, price: 25000, category: "SINH TỐ" },
    { id: 2, name: "Cà phê sữa", image: imgfood2, sell_price: 30000, price: 35000, category: "CAFÉ" },
    { id: 3, name: "Cà phê đen", image: imgfood3, sell_price: 40000, price: 45000, category: "CAFÉ" },
    { id: 4, name: "Trà sữa trân châu đường đen", image: imgfood4, sell_price: 50000, price: 55000, category: "TRÀ SỮA" },
    { id: 5, name: "Trà đào cam sả", image: imgfood5, sell_price: 60000, price: 65000, category: "TRÀ" },
    { id: 6, name: "Cam tắc xí muội", image: imgfood6, sell_price: 70000, price: 75000, category: "TRÀ LẠNH" },
    { id: 7, name: "Trà sữa ô long", image: imgfood7, sell_price: 80000, price: 85000, category: "TRÀ SỮA" },
  ];

  // Danh sách danh mục
  const categories = ["TẤT CẢ", "CAFÉ", "TRÀ", "TRÀ SỮA", "SINH TỐ", "TRÀ LẠNH"];

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
    if (category) setActiveCategory(category);
  }, [location.search]);

  // Lọc sản phẩm theo danh mục
  const filterItems =
    activeCategory === "TẤT CẢ" ? products : products.filter((item) => item.category === activeCategory);

  // Xử lý khi nhấn yêu thích
  const handleToggleFavorite = (id) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  };

  // Xử lý khi nhấn "Thêm vào giỏ hàng"
  const handleAddToCart = (product) => {
    setSelectedProduct(product);
  };

  // Đóng Modal
  const handleCloseModal = () => {
    setSelectedProduct(null);
    setQuantity(1);
  };

  // Chuyển đổi danh mục
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    navigate(`/menu?category=${category}`);
  };

  return (
    <div className="menu-wrapper">
      <h1 className="menu-header">
        Thực đơn Bamos<span>Coffee</span>
      </h1>

      {/* Hiển thị danh mục */}
      <div className="menu-category-wrapper">
        {categories.map((category) => (
          <button
            key={category}
            className={`menu-category-button ${activeCategory === category ? "active" : ""}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Hiển thị danh sách sản phẩm */}
      <div className="menu-items-wrapper">
        {filterItems.map((item) => (
          <div className="menu-item-card" key={item.id}>
            <div className="menu-item-image">
              <Link to={`/detailfood/${item.id}`}>
                <img src={item.image} alt={item.name} />
              </Link>
            </div>

            {/* Icon yêu thích */}
            <div
              className={`favorite-icon ${favorites[item.id] ? "active" : ""}`}
              onClick={() => handleToggleFavorite(item.id)}
            >
              {favorites[item.id] ? "♥" : "♡"}
            </div>

            {/* Thông tin sản phẩm */}
            <div className="menu-item-info">
              <h6 className="menu-item-name">
                <Link to={`/detailfood/${item.id}`}>{item.name}</Link>
              </h6>
              <div className="menu-item-price">
                <span>{item.sell_price.toLocaleString()} đ</span>
                {item.price !== item.sell_price && (
                  <span className="price-old">{item.price.toLocaleString()} đ</span>
                )}
              </div>
            </div>

            {/* Nút thêm vào giỏ hàng */}
            <div className="add-to-cart-button">
              <button onClick={() => handleAddToCart(item)}>Thêm vào giỏ hàng</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal hiển thị sản phẩm */}
      {selectedProduct && (
        <ModalProduct
          selectedProduct={selectedProduct}
          quantity={quantity}
          setQuantity={setQuantity}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Menu;
