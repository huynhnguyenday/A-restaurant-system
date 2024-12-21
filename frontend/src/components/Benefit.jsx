import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVanShuttle,
  faMoneyBill,
  faTicket,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const Benefit = () => {
  return (
    <div className="my-24 bg-white">
      <div className="flex flex-col justify-center gap-4 sm:flex-row items-center sm:gap-0">
        {/* Ô 1 */}
        <div className="flex h-[100px] w-[325px] items-center justify-start border border-white bg-[#f3f2f2] pl-10">
          <FontAwesomeIcon
            className="mr-4 text-[30px] text-[#000]"
            icon={faVanShuttle}
          />
          <div className="flex flex-col">
            <h6 className="mb-1 font-oswald text-[20px] font-bold text-black">
              Giao hàng miễn phí
            </h6>
            <p className="text-[15px] font-josefin text-black">Chỉ giao trong nội thành</p>
          </div>
        </div>

        {/* Ô 2 */}
        <div className="flex h-[100px] w-[325px] items-center justify-start border border-white bg-[#f3f2f2] pl-10">
          <FontAwesomeIcon
            className="mr-4 text-[30px] text-[#000]"
            icon={faMoneyBill}
          />
          <div className="flex flex-col">
            <h6 className="mb-1 font-oswald text-[20px] font-bold text-black">
              Thanh toán tiền mặt
            </h6>
            <p className="text-[15px] font-josefin text-black">Có cả thanh toán online</p>
          </div>
        </div>

        {/* Ô 3 */}
        <div className="flex h-[100px] w-[325px] items-center justify-start border border-white bg-[#f3f2f2] pl-10">
          <FontAwesomeIcon
            className="mr-4 text-[30px] text-[#000]"
            icon={faTicket}
          />
          <div className="flex flex-col">
            <h6 className="mb-1 font-oswald text-[20px] font-bold text-black">
              Khuyến mãi hấp dẫn
            </h6>
            <p className="text-[15px] font-josefin text-black">Ngày mới khuyến mãi mới</p>
          </div>
        </div>

        {/* Ô 4 */}
        <div className="flex h-[100px] w-[325px] items-center justify-start border border-white bg-[#f3f2f2] pl-10">
          <FontAwesomeIcon
            className="mr-4 text-[30px] text-[#000]"
            icon={faClock}
          />
          <div className="flex flex-col">
            <h6 className="mb-1 font-oswald text-[20px] font-bold text-black">
              Mở cửa 24/7
            </h6>
            <p className="text-[15px] font-josefin text-black">Mở cửa kể cả dịp lễ</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefit;
