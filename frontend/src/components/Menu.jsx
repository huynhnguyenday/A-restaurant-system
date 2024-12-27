import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ModalProduct from "./ModalProduct"; // Import ModalProduct component
import axios from "axios";
import Loading from "../components/website/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("TẤT CẢ");
  const [categories, setCategories] = useState(["TẤT CẢ"]); // Lưu danh sách danh mục
  const [products, setProducts] = useState([]); // Lưu danh sách sản phẩm
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); // Số sản phẩm trên mỗi trang
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Menu");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/mainPages/activeCategories"
        );
        const categoryData = response.data.data.map((category) => category.name);
        setCategories(["TẤT CẢ", ...categoryData]);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/mainPages/activeProducts"
        );
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
    if (category) setActiveCategory(category);
  }, [location.search]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    handleCategoryClick(category);
    setIsMenuOpen(false);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    navigate(`/menu?category=${category}`);
    setCurrentPage(1); // Reset về trang đầu tiên khi đổi danh mục
  };

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setQuantity(1);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts =
    activeCategory === "TẤT CẢ"
      ? products.filter((item) => item.category?.isActive === 1).slice(indexOfFirstProduct, indexOfLastProduct)
      : products
          .filter((item) => item.category.name === activeCategory)
          .slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(
    (activeCategory === "TẤT CẢ"
      ? products.filter((item) => item.category?.isActive === 1)
      : products.filter((item) => item.category.name === activeCategory)
    ).length / productsPerPage
  );

  return (
    <div className="p-5 text-center">
      <h1 className="mb-4 text-4xl font-bold">
        Thực đơn Bamos<span className="text-[#C63402]">Coffee</span>
      </h1>
      <div className="relative mb-5">
        <div className="flex items-center justify-center px-4 pt-2 md:hidden">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 text-lg font-bold text-gray-800"
          >
            <FontAwesomeIcon icon={faSliders} />
            <span>{selectedCategory}</span>
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute left-0 top-full z-10 w-full bg-white shadow-lg">
            {categories.map((category) => (
              <button
                key={category}
                className={`w-full border border-b-2 px-4 py-2 text-left font-josefin text-xl font-bold transition-all ease-linear ${
                  activeCategory === category
                    ? "bg-[#633c02] text-white"
                    : "text-gray-800 hover:bg-[#d88453]"
                }`}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="hidden justify-center font-bold md:flex">
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
      </div>
      {isLoading ? (
        <div className="flex h-[300px] items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="mx-auto flex max-w-7xl flex-wrap justify-start">
          <div className="flex flex-wrap gap-0">
            {currentProducts.map((item) => (
              <div
                className="group relative mt-8 flex h-[340px] w-[190px] flex-col justify-between border-l border-r border-gray-300 bg-white p-3 text-center transition-shadow ease-linear lg:h-[340px] lg:w-[250px]"
                key={item._id}
              >
                <div>
                  <Link to={`/detailfood/${item._id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="mx-auto h-[216px] transition-transform ease-linear group-hover:scale-[1.18]"
                    />
                  </Link>
                </div>

                <div className="mb-12 mt-4">
                  <h6 className="text-sm font-bold text-[#333]">
                    <Link
                      to={`/detailfood/${item._id}`}
                      className="font-josefin text-xl font-bold text-[#00561e]"
                    >
                      {item.name.substring(0, 20)}
                      {item.name.length > 20 && "..."}
                    </Link>
                  </h6>

                  <div className="mb-2 font-josefin text-lg font-bold text-[#925802]">
                    <span>{item.sell_price.toLocaleString()} đ</span>
                    {item.price !== item.sell_price && (
                      <span className="ml-2 text-base text-gray-500 line-through">
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
      )}

      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-1 px-3 py-1 font-bold ${
              currentPage === index + 1
                ? "bg-[#633c02] text-white"
                : "bg-white text-gray-800 hover:bg-[#d88453]"
            } border border-gray-300`}
          >
            {index + 1}
          </button>
        ))}
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
