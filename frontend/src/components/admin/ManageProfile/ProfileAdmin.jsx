import { useState } from "react";
import ChangePassword from "./ChangePassword";
import ChangeInfor from "./ChangeInfor";

const ProfileAdmin = () => {
  // Placeholder data giả
  const [profileData] = useState({
    name: "Nguyễn Văn A",
    password: "123456",
    email: "nguyenvana@example.com",
    phone: "0123456789",
  });

  // Trạng thái hiển thị modal
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isInforModalOpen, setInforModalOpen] = useState(false);

  return (
    <div className="flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 text-center font-josefin text-4xl font-bold">Trang cá nhân</div>

        <div className="mb-4 ml-20 flex max-w-4xl space-x-6">
          {/* Phần Tên và Category */}
          <div className="w-2/3">
            <label className="mt-4 block font-josefin text-2xl font-bold">
              Tên người dùng
            </label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              className="peer block w-3/4 appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 pb-[2px] pt-2 text-lg text-gray-900 focus:outline-none"
              readOnly
            />
            <label className="mt-8 block font-josefin text-2xl font-bold">
              Mật khẩu
            </label>
            <input
              type="password"
              name="password"
              value={profileData.password}
              className="peer block w-3/4 appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 pb-[2px] pt-2 text-lg text-gray-900 focus:outline-none"
              readOnly
            />

            <label className="mt-8 block font-josefin text-2xl font-bold">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              className="peer block w-3/4 appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 pb-[2px] pt-2 text-lg text-gray-900 focus:outline-none"
              readOnly
            />
            <label className="mt-8 block font-josefin text-2xl font-bold">
              Số điện thoại
            </label>
            <input
              type="tel"
              name="phone"
              value={profileData.phone}
              className="peer block w-3/4 appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 pb-[2px] pt-2 text-lg text-gray-900 focus:outline-none"
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
              className="w-3/4 mt-8 rounded bg-black px-4 py-2 text-white transition-transform duration-200 hover:scale-95"
              onClick={() => setInforModalOpen(true)}
            >
              Cập nhật thông tin
            </button>
          </div>
        </div>
      </div>

      {/* Modal Đổi mật khẩu */}
      {isPasswordModalOpen && (
        <ChangePassword onClose={() => setPasswordModalOpen(false)} />
      )}

      {/* Modal Cập nhật thông tin */}
      {isInforModalOpen && (
        <ChangeInfor onClose={() => setInforModalOpen(false)} />
      )}
    </div>
  );
};

export default ProfileAdmin;
