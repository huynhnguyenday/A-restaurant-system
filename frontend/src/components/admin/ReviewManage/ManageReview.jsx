import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faPen,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../components/website/Loading";

const ManageReview = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dữ liệu tĩnh
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const fetchedReviews = [
          {
            id: 2,
            productName: "Trà sữa olong",
            review: [
              {
                id: "r001",
                name: "Nguyễn Hữu Huỳnh",
                email: "nguyenhuuhuynh27022003@example.com",
                createdAt: "2024-12-23",
                content: "Sản phẩm rất tốt, đáng mua!",
                rate: 5,
                activeReview: 1,
              },
              {
                id: "r002",
                name: "Nguyễn Thị Lan",
                email: "nguyenthilan@example.com",
                createdAt: "2024-12-22",
                content: "Thiết kế đẹp, nhưng pin hơi yếu.",
                rate: 3,
                activeReview: 1,
              },
            ],
          },
          {
            id: 1,
            productName: "Matcha đá xay",
            review: [
              {
                id: "r003",
                name: "Nguyễn Lê Minh Hùng",
                email: "nguyenleminhhung2087@example.com",
                createdAt: "2024-12-20",
                content: "Hàng nhận được đúng như mô tả, rất hài lòng.",
                rate: 4,
                activeReview: 2,
              },
            ],
          },
        ];
        setReviews(fetchedReviews);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error.message);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Toggle trạng thái đánh giá (hiển thị hoặc ẩn)
  const toggleActiveReview = (productId, reviewId) => {
    setReviews((prevReviews) =>
      prevReviews.map((product) =>
        product.id === productId
          ? {
              ...product,
              review: product.review.map((review) =>
                review.id === reviewId
                  ? {
                      ...review,
                      activeReview: review.activeReview === 1 ? 2 : 1,
                    }
                  : review,
              ),
            }
          : product,
      ),
    );
  };

  // Lọc sản phẩm và đánh giá
  const filteredReviews = reviews.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.review.some(
        (review) =>
          review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.email.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-full rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 text-center text-2xl font-bold">
          Quản lý bình luận
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm bằng tên sản phẩm hoặc tên người đánh giá"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-2/5 rounded-md border border-gray-300 p-2"
          />
        </div>

        <div className="overflow-x-auto rounded-lg shadow-md">
          {loading ? (
            <Loading />
          ) : (
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left">Tên sản phẩm</th>
                  <th className="px-4 py-3 text-left">Tên</th>
                  <th className="px-4 py-3 text-left">Ngày</th>
                  <th className="px-4 py-3 text-left">Rate</th>
                  <th className="px-4 py-3 text-center">Hiển thị</th>
                  <th className="px-4 py-3 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredReviews.map((product) =>
                  product.review.map((review) => (
                    <tr key={review.id} className="border-b">
                      <td className="px-4 py-8 text-left font-bold">
                        {product.productName}
                      </td>
                      <td className="px-4 py-8 text-left font-bold">
                        {review.name}
                      </td>
                      <td className="px-4 py-8 text-left">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-8 text-center">{review.rate}⭐</td>
                      <td className="px-4 py-8 text-center">
                        <FontAwesomeIcon
                          icon={review.activeReview === 1 ? faEye : faEyeSlash}
                          className={
                            review.activeReview === 1
                              ? "cursor-pointer text-2xl text-blue-500"
                              : "cursor-pointer text-xl text-gray-400"
                          }
                          onClick={() =>
                            toggleActiveReview(product.id, review.id)
                          }
                        />
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => setSelectedReview(review)}
                          className="rounded-full px-3 py-1 text-2xl text-blue-500 hover:bg-gray-200"
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                      </td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          )}
        </div>

        {selectedReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="relative w-full max-w-5xl rounded-lg bg-white p-6 shadow-lg">
              <button
                onClick={() => setSelectedReview(null)}
                className="absolute right-5 top-3 text-4xl text-gray-400 hover:text-black"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
              <h2 className="mb-8 text-center text-5xl font-bold">
                Chi tiết bình luận
              </h2>
              <form>
                <div className="flex space-x-6">
                  <div className="w-1/2 pl-10">
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
                      className="mb-4 h-56 max-h-96 w-full overflow-y-auto rounded-md border border-gray-300 p-2"
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
