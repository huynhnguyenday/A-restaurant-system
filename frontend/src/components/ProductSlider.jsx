import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import ModalProduct from "./ModalProduct";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ProductSlider.css";

const ProductSlider = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const swiperRef = useRef(null);

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/mainPages"); // Gọi API bằng Axios
        if (response.data.success) {
          setProducts(response.data.data); // Lưu dữ liệu vào state
        } else {
          console.error("Failed to fetch products.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
  };

  const handleToggleFavorite = (productId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [productId]: !prevFavorites[productId],
    }));
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setQuantity(1);
  };

  return (
    <div className="product-slider" ref={ref}>
      <div className="slider-title">Sản phẩm bán chạy</div>
      <Swiper
        ref={swiperRef}
        spaceBetween={0}
        slidesPerView={5}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        breakpoints={{
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={product._id}>
            <motion.div
              className="product-card"
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 100 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.2, type: "spring", stiffness: 80 },
                },
              }}
            >
              <div className="product-image">
                <Link to={`/detailfood/${product._id}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
              </div>
              <div
                className={`favorite ${favorites[product.id] ? "favorite-active" : ""}`}
                onClick={() => handleToggleFavorite(product._id)}
              >
                {favorites[product._id] ? "♥" : "♡"}
              </div>
              <div className="product-bubble">HOT</div>
              <div className="product-info">
                <h6 className="product-name">
                  <Link to={`/detailfood/${product._id}`}>{product.name}</Link>
                </h6>
                <div className="product-price">
                  <span>{product.sell_price.toLocaleString()} đ</span>
                  {product.price !== product.sell_price && (
                    <span className="price-old">{product.price.toLocaleString()} đ</span>
                  )}
                </div>
              </div>
              <div className="red-button">
                <button onClick={() => handleAddToCart(product)}>Thêm vào giỏ hàng</button>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-button-prev" onClick={() => swiperRef.current?.swiper.slidePrev()}></div>
      <div className="swiper-button-next" onClick={() => swiperRef.current?.swiper.slideNext()}></div>

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

export default ProductSlider;
