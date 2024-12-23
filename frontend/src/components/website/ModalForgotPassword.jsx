const ModalForgotPassword = () => {
  return (
    <div className="mt-10 flex min-h-[65%] justify-center bg-white">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 text-center">
        <div className="mb-6 flex justify-center">
          <h2
            className={`cursor-pointer px-4 py-2 font-josefin text-4xl font-bold`}
          >
            Quên mật khẩu
          </h2>
        </div>
        <div className="relative z-0 mb-4">
          <input
            type="text"
            id="register_username"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-lg text-gray-900 focus:border-black focus:outline-none focus:ring-0"
            placeholder=" "
            required
          />
          <label
            htmlFor="register_username"
            className="absolute top-1 z-10 flex origin-[0] -translate-y-6 scale-75 transform items-start font-josefin text-lg text-gray-500 duration-300 peer-placeholder-shown:z-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:z-10 peer-focus:-translate-y-6 peer-focus:scale-75"
          >
            Nhập email
          </label>
        </div>
        <button
          type="submit"
          className="mb-2 mt-3 w-full rounded-lg bg-black py-3 font-josefin text-xl text-white transition-transform duration-200 hover:scale-90"
        >
          Đặt lại mật khẩu
        </button>
        <a href="/login" className="text-lg text-gray-500 hover:text-black">
          Quay lại đăng nhập?
        </a>
      </div>
    </div>
  );
};

export default ModalForgotPassword;
