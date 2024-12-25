// Authenti
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthenticationCode = () => {
  const [code, setCode] = useState(""); // State lưu mã xác thực
  const navigate = useNavigate(); // Hook navigate từ react-router-dom

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code) {
      // Bạn có thể xử lý mã xác thực ở đây (kiểm tra, gửi yêu cầu API, v.v.)
      toast.success("Mã xác thực đúng!!");
      // Chuyển hướng về trang đăng nhập sau khi nhập mã xác thực thành công
      navigate("/resetpassword");
    }
  };

  return (
    <div className="mt-10 flex min-h-[65%] justify-center bg-white">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 text-center">
        <div className="mb-6 flex justify-center">
          <h2 className="cursor-pointer px-4 py-2 font-josefin text-4xl font-bold">
            Nhập mã xác thực
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="relative z-0 mb-4">
            <input
              type="text"
              id="verification_code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:border-black focus:outline-none focus:ring-0"
              placeholder=" "
              required
            />
            <label
              htmlFor="verification_code"
              className="absolute top-1 z-10 flex origin-[0] -translate-y-6 scale-75 transform items-start font-josefin text-lg text-gray-500 duration-300 peer-placeholder-shown:z-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:z-10 peer-focus:-translate-y-6 peer-focus:scale-75"
            >
              Nhập mã xác thực
            </label>
          </div>
          <button
            type="submit"
            className="mb-2 mt-3 w-full rounded-lg bg-black py-3 font-josefin text-xl text-white transition-transform duration-200 hover:scale-90"
          >
            Xác nhận
          </button>
        </form>
        <a href="/login" className="text-lg text-gray-500 hover:text-black">
          Quay lại đăng nhập?
        </a>
      </div>
    </div>
  );
};

export default AuthenticationCode;
