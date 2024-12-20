const ProfileAdmin = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-7xl rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 text-center text-2xl font-bold">Trang cá nhân</div>

        <div className="mb-4 flex space-x-6 max-w-4xl">
          {/* Phần Tên và Category */}
          <div className="w-2/3">
            <label className="block pb-2 text-xl font-medium">
              Tên sản phẩm
            </label>
            <input
              type="text"
              name="name"
              className="w-full rounded-md border border-gray-300 p-2"
              required
            />
            <label className="block pb-2 text-xl font-medium">
              Giá sản phẩm
            </label>
            <input
              type="text"
              name="price"
              className="w-full rounded-md border border-gray-300 p-2"
              required
            />

            <label className="mt-4 block pb-2 text-xl font-medium">
              Giá giảm
            </label>
            <input
              type="text"
              name="sell_price"
              className="w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>

          {/* Hiển thị ảnh đã chọn hoặc ảnh cũ */}
          <div className="w-1/2">
            <label className="block pb-2 text-xl font-medium">Ảnh</label>
            <input
              type="file"
              accept="image/*"
              className="w-full rounded-md border border-gray-300 p-2"
            />
            <div className="mb-2 mt-4"></div>
          </div>
        </div>

        {/* Nút Cancel và Update */}
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            className="mr-28 h-12 w-28 rounded-md bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="h-12 w-36 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          >
            Cập Nhật
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileAdmin;
