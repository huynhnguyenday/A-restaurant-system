const ChangePasswordCs = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-lg">
        <h2 className="flex justify-center font-josefin text-4xl font-bold">
          Đổi mật khẩu
        </h2>
        {/* Nội dung form */}
        <form>
          <label className="mb-2 mt-8 block font-josefin text-2xl font-bold">
            Mật khẩu cũ
          </label>
          <input type="password" className="h-11 w-full rounded border-2 p-2" />
          <label className="mb-2 mt-4 block font-josefin text-2xl font-bold">
            Mật khẩu mới
          </label>
          <input type="password" className="h-11 w-full rounded border-2 p-2" />
          <label className="mb-2 mt-4 block font-josefin text-2xl font-bold">
            Nhập lại mật khẩu
          </label>
          <input type="password" className="h-11 w-full rounded border-2 p-2" />
        </form>
        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onClose}
            className="mt-4 w-20 rounded-md bg-gray-300 px-4 py-2 text-black transition-transform duration-200 hover:scale-95"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="mt-4 rounded-md bg-black px-8 py-2 text-white transition-transform duration-200 hover:scale-95"
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordCs;
