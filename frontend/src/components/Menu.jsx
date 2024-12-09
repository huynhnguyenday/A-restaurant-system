import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ModalProduct from "./ModalProduct"; // Import ModalProduct component
import "./Menu.css";
import axios from "axios";
// Import hình ảnh
const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("TẤT CẢ");
  const [categories, setCategories] = useState(["TẤT CẢ"]); // Lưu danh sách danh mục, mặc định có "TẤT CẢ"
  const [products, setProducts] = useState([]); // Lưu danh sách sản phẩm
  const [favorites, setFavorites] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

   useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/mainPages/activeCategories"); // Thay URL phù hợp với API backend
        const categoryData = response.data.data.map((category) => category.name); // Chỉ lấy tên danh mục
        setCategories(["TẤT CẢ", ...categoryData]); // Thêm "TẤT CẢ" vào đầu danh sách
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  // Fetch sản phẩm từ API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/mainPages/activeProducts"); // Thay URL phù hợp
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
    if (category) setActiveCategory(category);
  }, [location.search]);

  // Lọc sản phẩm theo danh mục
  const filterItems =
    activeCategory === "TẤT CẢ" ? products : products.filter((item) => item.category.name === activeCategory);
  
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
          <div className="menu-item-card" key={item._id}>
            <div className="menu-item-image">
              <Link to={`/detailfood/${item._id}`}>
                <img src={item.image} alt={item.name} />
              </Link>
            </div>

            {/* Icon yêu thích */}
            <div
              className={`favorite-icon ${favorites[item._id] ? "active" : ""}`}
              onClick={() => handleToggleFavorite(item._id)}
            >
              {favorites[item._id] ? "♥" : "♡"}
            </div>

            {/* Thông tin sản phẩm */}
            <div className="menu-item-info">
              <h6 className="menu-item-name">
                <Link to={`/detailfood/${item._id}`}>{item.name}</Link>
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
