import { useEffect, useState } from "react";
import ChangePasswordCs from "./ChangePasswordCs";
import ChangeInformation from "./ChangeInformation";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie"; // Thư viện xử lý cookies
import { decodeJWT } from "../../utils/jwtUtils"; // Hàm decodeJWT bạn đã tạo

const CustomerProfile = () => {
  const [profileData, setProfileData] = useState(null); // Trạng thái lưu thông tin tài khoản
  const [loading, setLoading] = useState(true); // Trạng thái loading

  // Trạng thái hiển thị modal
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isInforModalOpen, setInforModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Lấy JWT từ cookie
        const token = Cookies.get("jwtToken");
        if (!token) {
          toast.error("Bạn chưa đăng nhập!");
          return;
        }

        // Giải mã token để lấy _id
        const decoded = decodeJWT(token);
        console.log("Decoded JWT:", decoded);
        const userId = decoded?.id;

        if (!userId) {
          toast.error("Token không hợp lệ!");
          return;
        }

        // Gọi API lấy thông tin tài khoản theo _id
        const response = await axios.get(
          `http://localhost:5000/api/accounts/${userId}`,
        ); // Đường dẫn API `getAccountsById`

        if (response.data.success) {
          setProfileData(response.data.data);
        } else {
          toast.error(
            response.data.message || "Không thể tải thông tin tài khoản!",
          );
        }
      } catch (error) {
        console.error("Error fetching account data:", error);
        toast.error("Lỗi khi tải thông tin tài khoản!");
      } finally {
        setLoading(false); // Tắt trạng thái loading
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <div>Đang tải thông tin...</div>;
  }

  if (!profileData) {
    return <div>Không thể hiển thị thông tin tài khoản!</div>;
  }

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-4xl rounded-lg bg-white p-6">
        <div className="mb-4 text-center font-josefin text-4xl font-bold">
          Trang cá nhân
        </div>

        <div className="mb-4 ml-20 flex max-w-4xl space-x-6">
          {/* Phần Tên và Category */}
          <div className="w-2/3">
            <label className="mt-4 block font-josefin text-2xl font-bold">
              Tên người dùng
            </label>
            <input
              type="text"
              name="name"
              value={profileData.username}
              className="peer block w-3/4 appearance-none border-0 border-b-2 border-gray-300 bg-transparent pl-2 pt-2 font-josefin text-lg text-gray-900 focus:outline-none"
              readOnly
            />
            <label className="mt-8 block font-josefin text-2xl font-bold">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={profileData.gmail}
              className="peer block w-3/4 appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 pt-2 text-lg text-gray-900 focus:outline-none"
              readOnly
            />
            <label className="mt-8 block font-josefin text-2xl font-bold">
              Số điện thoại
            </label>
            <input
              type="tel"
              name="phone"
              value={profileData.numbers}
              className="peer block w-3/4 appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 pt-2 text-lg text-gray-900 focus:outline-none"
              readOnly
            />
          </div>

          {/* Các nút chỉnh sửa */}
          <div className="flex w-1/2 flex-col items-center justify-center">
            <button
              className="w-3/4 rounded bg-black px-4 py-2 text-white transition-transform duration-200 hover:scale-95"
              onClick={() => setPasswordModalOpen(true)}
            >
              Đổi mật khẩu
            </button>
            <button
              className="mt-8 w-3/4 rounded bg-black px-4 py-2 text-white transition-transform duration-200 hover:scale-95"
              onClick={() => setInforModalOpen(true)}
            >
              Cập nhật thông tin
            </button>
          </div>
        </div>
      </div>

      {/* Modal Đổi mật khẩu */}
      {isPasswordModalOpen && (
        <ChangePasswordCs onClose={() => setPasswordModalOpen(false)} />
      )}

      {/* Modal Cập nhật thông tin */}
      {isInforModalOpen && (
        <ChangeInformation onClose={() => setInforModalOpen(false)} />
      )}
    </div>
  );
};

export default CustomerProfile;
