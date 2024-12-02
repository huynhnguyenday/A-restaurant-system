import React from "react";
import './Benefit.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVanShuttle, faMoneyBill, faTicket, faClock } from '@fortawesome/free-solid-svg-icons';

const Benefit = () => {
  return (
    <div className="benefit">
      <div className="benefit_row">
        {/* Ô 1 */}
        <div className="benefit_item">
          <FontAwesomeIcon className="benefit_icon" icon={faVanShuttle} />
          <div className="benefit_content">
            <h6>Giao hàng miễn phí</h6>
            <p>Chỉ giao trong nội thành</p>
          </div>
        </div>

        {/* Ô 2 */}
        <div className="benefit_item">
          <FontAwesomeIcon className="benefit_icon" icon={faMoneyBill} />
          <div className="benefit_content">
            <h6>Thanh toán tiền mặt</h6>
            <p>Có cả thanh toán online</p>
          </div>
        </div>

        {/* Ô 3 */}
        <div className="benefit_item">
          <FontAwesomeIcon className="benefit_icon" icon={faTicket} />
          <div className="benefit_content">
            <h6>Khuyến mãi hấp dẫn</h6>
            <p>Ngày mới khuyến mãi mới</p>
          </div>
        </div>

        {/* Ô 4 */}
        <div className="benefit_item">
          <FontAwesomeIcon className="benefit_icon" icon={faClock} />
          <div className="benefit_content">
            <h6>Mở cửa 24/7</h6>
            <p>Mở cửa kể cả dịp lễ</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefit;
