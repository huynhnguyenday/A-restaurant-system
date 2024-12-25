import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faPen,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../components/website/Loading"; // Assuming you have a Loading component

const ManageReview = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  // Simulating an API call with useEffect
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true); // Start loading
      try {
        // Simulating a delay (e.g., fetching reviews from API)
        const fetchedReviews = [
          {
            id: 1,
            name: "Nguyễn Hữu Huỳnh",
            email: "nguyenhuuhuynh27022003@example.com",
            createdAt: "2024-12-23",
            content: "Sản phẩm rất tốt, đáng mua!",
            rate: 5,
            activeReview: 1,
          },
          {
            id: 2,
            name: "Nguyễn Lê Minh Hùng",
            email: "ngueynleminhhung2087@example.com",
            createdAt: "2024-12-20",
            content: "Hàng nhận được đúng như mô tả, rất hài lòng.",
            rate: 4,
            activeReview: 2,
          },
        ];
        setReviews(fetchedReviews);
        setLoading(false); // Stop loading once reviews are fetched
      } catch (error) {
        console.error("Error fetching reviews:", error.message);
        setLoading(false); // Stop loading even in case of an error
      }
    };

    fetchReviews();
  }, []);

  const toggleActiveReview = (id) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id
          ? { ...review, activeReview: review.activeReview === 1 ? 2 : 1 }
          : review,
      ),
    );
  };

  const filteredReviews = reviews.filter(
    (review) =>
      review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-full rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 text-center text-2xl font-bold">
          Quản lý bình luận
        </div>

        {/* Tìm kiếm bình luận */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm bằng tên hoặc email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/3 rounded-md border border-gray-300 p-2"
          />
        </div>

        {/* Table and Loading indicator */}
        <div className="overflow-x-auto rounded-lg shadow-md">
          {loading ? ( // Show loading state while fetching reviews
            <Loading />
          ) : (
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left">Tên</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Ngày</th>
                  <th className="px-4 py-3 text-center">Hiển thị</th>
                  <th className="px-4 py-3 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredReviews.map((review) => (
                  <tr key={review.id} className="border-b">
                    <td className="px-4 py-8 font-bold">{review.name}</td>
                    <td className="px-4 py-8">{review.email}</td>
                    <td className="px-4 py-8">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-8 text-center">
                      <div className="group relative">
                        <FontAwesomeIcon
                          icon={review.activeReview === 1 ? faEye : faEyeSlash}
                          className={
                            review.activeReview === 1
                              ? "cursor-pointer text-2xl text-blue-500"
                              : "cursor-pointer text-xl text-gray-400"
                          }
                          onClick={() => toggleActiveReview(review.id)}
                        />
                        <span className="absolute bottom-full left-1/2 mb-3 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 px-2 py-2 text-base text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                          Đặt hiển thị
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="group relative">
                        <button
                          onClick={() => setSelectedReview(review)}
                          className="rounded-full px-3 py-1 text-2xl text-blue-500 hover:bg-gray-200"
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                        <span className="absolute bottom-full left-1/2 mb-3 -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 px-2 py-2 text-base text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                          Xem chi tiết
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal Hiển thị thông tin chi tiết */}
        {selectedReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="relative w-full max-w-5xl rounded-lg bg-white p-6 shadow-lg">
              <button
                onClick={() => setSelectedReview(null)}
                className="absolute right-5 top-3 text-4xl text-gray-400 hover:text-black"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
              <h2 className="mb-8 text-center font-josefin text-5xl font-bold">
                Chi tiết bình luận
              </h2>
              <form>
                <div className="flex space-x-6">
                  {/* Left Section */}
                  <div className="w-1/2">
                    <label className="mb-2 block font-josefin text-2xl font-bold">
                      Tên người đánh giá
                    </label>
                    <p className="mb-8 rounded-md border border-gray-300 p-2">
                      {selectedReview.name}
                    </p>
                    <label className="mb-2 block font-josefin text-2xl font-bold">
                      Email
                    </label>
                    <p className="mb-8 rounded-md border border-gray-300 p-2">
                      {selectedReview.email}
                    </p>
                    <label className="mb-2 block font-josefin text-2xl font-bold">
                      Ngày đánh giá
                    </label>
                    <p className="mb-4 w-1/3 rounded-md border border-gray-300 p-2">
                      {new Date(selectedReview.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {/* Right Section */}
                  <div className="w-2/3 pl-10">
                    <label className="mb-2 block font-josefin text-2xl font-bold">
                      Đánh giá
                    </label>
                    <div className="mb-8 ml-4 flex">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <span
                          key={num}
                          className={`cursor-pointer text-4xl ${num <= selectedReview.rate ? "text-yellow-500" : "text-black"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <label className="mb-2 block font-josefin text-2xl font-bold">
                      Nội dung đánh giá
                    </label>
                    <textarea
                      readOnly
                      className="mb-4 max-h-80 w-full overflow-y-auto rounded-md border border-gray-300 p-2"
                    >
                      {selectedReview.content}
                    </textarea>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageReview;
