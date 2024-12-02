import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import "./ModalProduct.css";

const ModalProduct = ({ selectedProduct, quantity, setQuantity, onClose, addToCart }) => {
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
    // Gọi hàm addToCart để thêm sản phẩm vào giỏ hàng
    addToCart({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.sell_price,
      img: selectedProduct.image,
      quantity: quantity,
    });
    onClose(); // Đóng modal sau khi thêm vào giỏ hàng
  };

  return (
    <div className="modal">
      <div className="modal-content-food">
        <div className="modal-left">
          <img src={selectedProduct.image} alt={selectedProduct.name} className="modal-image" />
        </div>
        <div className="modal-right">
          <h1 className="modal-title">{selectedProduct.name}</h1>
          <p className="modal-price">
            <span className="modal-sell-price">{selectedProduct.sell_price.toLocaleString()}đ</span>
            <span className="modal-price-old">{selectedProduct.price.toLocaleString()}đ</span>
          </p>
          <div className="separator"></div>
          <div className="modal-quantity">
            <span className="quantity-label">Số lượng:</span>
            <div className="quantity-controls">
              <button className="btn-minus" onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}>-</button>
              <input
                type="text"
                value={quantity}
                onChange={handleQuantityChange}
                onBlur={handleBlur}
                className="quantity-input-modal"
              />
              <button className="btn-plus" onClick={() => setQuantity((prev) => prev + 1)}>+</button>
            </div>
          </div>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            <FontAwesomeIcon icon={faBasketShopping} /> Thêm vào giỏ
          </button>
          <button className="close-modal-btn" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalProduct;
