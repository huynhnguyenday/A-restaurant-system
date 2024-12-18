import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
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
        const response = await axios.get(
          `http://localhost:5000/api/mainPages/${id}`,
        );
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
        const response = await axios.get(
          "http://localhost:5000/api/mainPages/activeCategories",
        );
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

  const handleAddToCart = () => {
    // Lấy giỏ hàng hiện tại từ sessionStorage
    const tempCart = JSON.parse(sessionStorage.getItem("tempCart")) || [];

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    const existingItemIndex = tempCart.findIndex(
      (item) => item.productId === product._id,
    );

    if (existingItemIndex > -1) {
      // Nếu đã tồn tại, tăng số lượng
      tempCart[existingItemIndex].quantity += quantity;
    } else {
      // Nếu chưa, thêm sản phẩm mới
      tempCart.push({
        productId: product._id,
        name: product.name,
        img: product.image,
        price: product.sell_price,
        quantity,
      });
    }

    // Lưu lại giỏ hàng vào sessionStorage
    sessionStorage.setItem("tempCart", JSON.stringify(tempCart));

    // Hiển thị thông báo (tuỳ chọn)
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
  };

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col pb-16 pt-8 md:flex-row">
      {/* Left Section */}
      <div className="w-full scale-90 cursor-pointer overflow-hidden rounded-lg md:w-[300px]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      {/* Center Section */}
      <div className="items-center justify-center pt-14 md:px-16 md:pt-16">
        <div className="text-center md:text-left">
          <h1 className="w-[393px] pb-4 pl-2 font-josefin text-5xl font-bold text-[#00561e] md:pl-0">
            {product.name}
          </h1>
          <p>
            <span className="text-[30px] font-bold text-[#663402]">
              {product.sell_price.toLocaleString()}đ
            </span>
            <span className="ml-4 text-[20px] text-gray-500 line-through">
              {product.price.toLocaleString()}đ
            </span>
          </p>
          <div className="mb-2 h-[1px] w-full bg-gray-300"></div>
          <span className="font-josefin-sans text-[15px] font-semibold">
            Số lượng:
          </span>
          <div className="mt-2 flex items-center justify-center gap-2 md:justify-start">
            <button
              className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-gray-300 text-[18px] font-bold"
              onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
            >
              -
            </button>
            <input
              type="text"
              value={quantity}
              onChange={handleQuantityChange}
              onBlur={handleBlur}
              className="h-[36px] w-[60px] rounded-md border border-gray-300 text-center text-[18px]"
            />
            <button
              className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-gray-300 text-[18px] font-bold"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>
          <button
            className="font-josefin-sans mt-4 h-[56px] w-[393px] cursor-pointer rounded-full bg-gradient-to-r from-[#00864a] to-[#925802] text-[28px] font-bold text-white transition-colors hover:from-[#006635] hover:to-[#7a3e01]"
            onClick={handleAddToCart}
          >
            <FontAwesomeIcon icon={faBasketShopping} /> Thêm vào giỏ
          </button>
        </div>
      </div>
      {/* Right Section */}
      <div className="w-[400px] flex-1 pl-6 pt-14 md:w-[300px]">
        <h3 className="font-josefin-sans text-center text-[30px] font-bold md:text-start">
          Danh mục thực đơn
        </h3>
        <ul className="m-0 list-none p-0 pt-4 text-center md:text-start">
          {categories.map((category) => (
            <li
              key={category._id}
              onClick={() => handleCategoryClick(category.name)}
              className={`cursor-pointer border-b border-gray-200 px-4 py-2 text-[16px] transition-colors duration-300 ${
                category.name === activeCategory
                  ? "bg-[#169cbe] font-bold text-white"
                  : "hover:bg-[#169cbe] hover:font-bold hover:text-white"
              }`}
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
