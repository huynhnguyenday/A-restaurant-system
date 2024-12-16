import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ModalProduct from "./ModalProduct"; // Import ModalProduct component
import axios from "axios";

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
        const response = await axios.get(
          "http://localhost:5000/api/mainPages/activeCategories",
        ); // Thay URL phù hợp với API backend
        const categoryData = response.data.data.map(
          (category) => category.name,
        ); // Chỉ lấy tên danh mục
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
        const response = await axios.get(
          "http://localhost:5000/api/mainPages/activeProducts",
        ); // Thay URL phù hợp
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
    activeCategory === "TẤT CẢ"
      ? products.filter((item) => item.category?.isActive === 1)
      : products.filter((item) => item.category.name === activeCategory);

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
    <div className="p-5 text-center">
      <h1 className="mb-4 text-4xl font-bold">
        Thực đơn Bamos<span className="text-[#C63402]">Coffee</span>
      </h1>

      <div className="mb-5 flex justify-center font-bold">
        {categories.map((category) => (
          <button
            key={category}
            className={`mt-8 border-[0.5px] border-gray-300 px-5 py-2 text-base transition-all ease-linear ${
              activeCategory === category
                ? "border-[#633c02] bg-[#633c02] text-white"
                : "bg-white text-gray-800"
            } hover:bg-[#d88453]`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap justify-start">
        <div className="mx-auto flex flex-wrap justify-start gap-0">
          {filterItems.map((item) => (
            <div
              className="group relative mt-8 flex h-[340px] w-[250px] flex-col justify-between border-l border-r border-gray-300 bg-white p-3 text-center transition-shadow ease-linear"
              key={item._id}
            >
              <div>
                <Link to={`/detailfood/${item._id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="mx-auto h-[216px] w-[154px] transition-transform ease-linear group-hover:scale-[1.18]"
                  />
                </Link>
              </div>

              <div
                className={`absolute left-2 top-2 cursor-pointer text-2xl transition-colors ease-linear ${
                  favorites[item._id] ? "text-[#d88453]" : "text-black"
                }`}
                onClick={() => handleToggleFavorite(item._id)}
              >
                {favorites[item._id] ? "♥" : "♡"}
              </div>

              <div className="mb-12 mt-4">
                <h6 className="text-sm font-bold text-[#333]">
                  <Link
                    to={`/detailfood/${item._id}`}
                    className="text-[#00561e] font-josefin font-bold text-xl"
                  >
                    {item.name}
                  </Link>
                </h6>
                <div className="mb-2 text-base font-josefin font-bold text-[#925802]">
                  <span>{item.sell_price.toLocaleString()} đ</span>
                  {item.price !== item.sell_price && (
                    <span className="ml-2 text-xs text-gray-500 line-through">
                      {item.price.toLocaleString()} đ
                    </span>
                  )}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full opacity-0 transition-opacity ease-linear group-hover:opacity-100">
                <button
                  className="w-full bg-[#d88453] py-3 text-sm font-medium text-white transition-colors ease-linear hover:bg-[#633c02]"
                  onClick={() => handleAddToCart(item)}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

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
