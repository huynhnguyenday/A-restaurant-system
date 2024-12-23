import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { decodeJWT } from "../utils/jwtUtils";

const LoginPage = () => {
  const [isRegisterMode, setRegisterMode] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [numbers, setNumbers] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        },
        { withCredentials: true },
      );

      if (response.data.success) {
        toast.success("Đăng nhập thành công!");

        const token = response.data.token;
        if (token) {
          Cookies.set("jwtToken", token, { expires: 7, path: "/" });

          const decoded = decodeJWT(token);
          console.log("Decoded Token:", decoded);

          // Điều hướng dựa trên role
          if (
            decoded.role.includes("admin") ||
            decoded.role.includes("staff")
          ) {
            navigate("/admin");
          } else if (decoded.role.includes("customer")) {
            navigate("/customerprofile");
          } else {
            toast.error("Vai trò không hợp lệ!");
          }
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu không khớp!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/accounts/register-customer",
        {
          username,
          password,
          gmail: email,
          numbers, // số điện thoại từ input
        },
      );

      if (response.data.success) {
        toast.success("Đăng ký thành công!");
        setRegisterMode(false); // Chuyển về chế độ đăng nhập
      } else {
        setErrorMessage(response.data.message || "Đăng ký thất bại!");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.",
      );
    }
  };


  return (
    <div className="mt-2 flex min-h-[85%] justify-center bg-white">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center">
        <div className="mb-6 flex justify-center">
          <h2
            className={`w-1/2 cursor-pointer px-4 py-2 font-josefin text-2xl font-bold ${!isRegisterMode ? "border-b-2 border-black" : "text-gray-500"}`}
            onClick={() => setRegisterMode(false)}
          >
            Đăng Nhập
          </h2>
          <h2
            className={`w-1/2 cursor-pointer px-4 py-2 font-josefin text-2xl font-bold ${isRegisterMode ? "border-b-2 border-black" : "text-gray-500"}`}
            onClick={() => setRegisterMode(true)}
          >
            Đăng Ký
          </h2>
        </div>

        {isRegisterMode ? (
          <form onSubmit={handleRegister}>
            <h3 className="font-josefin text-gray-600">
              Hãy tạo tài khoản để có thể xem lại lịch sử đơn hàng và sản phẩm
              yêu thích
            </h3>
            <h4 className="pb-4 font-josefin text-gray-600">
              Vui lòng nhập đầy đủ thông tin!
            </h4>
            <div className="relative z-0 mb-4">
              <input
                type="text"
                id="register_username"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:border-black focus:outline-none focus:ring-0"
                placeholder=" "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label
                htmlFor="register_username"
                className="absolute top-1 z-10 flex origin-[0] -translate-y-6 scale-75 transform items-start font-josefin text-lg text-gray-500 duration-300 peer-placeholder-shown:z-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:z-10 peer-focus:-translate-y-6 peer-focus:scale-75"
              >
                Tên đăng nhập
              </label>
            </div>
            <div className="relative z-0 mb-4">
              <input
                type="text"
                id="register_numbers"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:border-black focus:outline-none focus:ring-0"
                placeholder=" "
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
                required
              />
              <label
                htmlFor="register_numbers"
                className="absolute top-1 z-10 flex origin-[0] -translate-y-6 scale-75 transform items-start font-josefin text-lg text-gray-500 duration-300 peer-placeholder-shown:z-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:z-10 peer-focus:-translate-y-6 peer-focus:scale-75"
              >
                Nhập số điện thoại
              </label>
            </div>
            <div className="relative z-0 mb-4">
              <input
                type="email"
                id="register_email"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:border-black focus:outline-none focus:ring-0"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label
                htmlFor="register_email"
                className="absolute top-1 z-10 flex origin-[0] -translate-y-6 scale-75 transform items-start font-josefin text-lg text-gray-500 duration-300 peer-placeholder-shown:z-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:z-10 peer-focus:-translate-y-6 peer-focus:scale-75"
              >
                Nhập Email
              </label>
            </div>
            <div className="relative z-0 mb-4">
              <input
                type="password"
                id="register_password"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:border-black focus:outline-none focus:ring-0"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label
                htmlFor="register_password"
                className="absolute top-1 z-10 flex origin-[0] -translate-y-6 scale-75 transform items-start font-josefin text-lg text-gray-500 duration-300 peer-placeholder-shown:z-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:z-10 peer-focus:-translate-y-6 peer-focus:scale-75"
              >
                Mật khẩu
              </label>
            </div>
            <div className="relative z-0 mb-4">
              <input
                type="password"
                id="register_confirm_password"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:border-black focus:outline-none focus:ring-0"
                placeholder=" "
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <label
                htmlFor="register_confirm_password"
                className="absolute top-1 z-10 flex origin-[0] -translate-y-6 scale-75 transform items-start font-josefin text-lg text-gray-500 duration-300 peer-placeholder-shown:z-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:z-10 peer-focus:-translate-y-6 peer-focus:scale-75"
              >
                Nhập lại mật khẩu
              </label>
            </div>
            {errorMessage && (
              <p className="mb-4 text-red-500">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="mt-3 w-full rounded bg-black py-3 font-josefin text-white transition-transform duration-200 hover:scale-95"
            >
              Đăng Ký
            </button>
            <button
              className="mt-2 text-lg text-gray-500 hover:text-black"
              onClick={() => setRegisterMode(false)}
            >
              Đã có tài khoản?
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <h3 className="font-josefin text-gray-600">
              Chào mừng quay trở lại
            </h3>
            <h4 className="mb-2 pb-4 font-josefin text-gray-600">
              Đăng nhập bằng tên đăng nhập và mật khẩu
            </h4>
            <div className="relative z-0 mb-4">
              <input
                type="text"
                id="login_username"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:border-black focus:outline-none focus:ring-0"
                placeholder=" "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label
                htmlFor="login_username"
                className="absolute top-1 z-10 flex origin-[0] -translate-y-6 scale-75 transform items-start font-josefin text-lg text-gray-500 duration-300 peer-placeholder-shown:z-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:z-10 peer-focus:-translate-y-6 peer-focus:scale-75"
              >
                Tên đăng nhập hoặc email
              </label>
            </div>

            <div className="relative z-0 mb-4">
              <input
                type="password"
                id="login_password"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:border-black focus:outline-none focus:ring-0"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label
                htmlFor="login_password"
                className="absolute top-1 z-10 flex origin-[0] -translate-y-6 scale-75 transform items-start font-josefin text-lg text-gray-500 duration-300 peer-placeholder-shown:z-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:z-10 peer-focus:-translate-y-6 peer-focus:scale-75"
              >
                Mật khẩu
              </label>
            </div>
            {errorMessage && (
              <p className="mb-4 text-red-500">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="mb-2 mt-3 w-full rounded bg-black py-3 font-josefin text-base text-white transition-transform duration-200 hover:scale-95"
            >
              Đăng Nhập
            </button>
            <a
              href="/forgotpassword"
              className="text-lg text-gray-500 hover:text-black"
            >
              Bạn quên mật khẩu?
            </a>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
