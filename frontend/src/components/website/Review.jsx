import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Review = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
    rate: 0,
  });
  const [showForm, setShowForm] = useState(false);

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      if (!productId) {
        toast.error("ID sản phẩm không hợp lệ!");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/reviews/${productId}`,
        );
        if (response.data.success) {
          setReviews(response.data.data || []);
          setShowForm(response.data.data.length === 0);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra khi tải đánh giá.");
      }
    };

    fetchReviews();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStarClick = (rate) => {
    setFormData({ ...formData, rate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Vui lòng nhập tên của bạn!");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Vui lòng nhập email hợp lệ!");
      return;
    }

    if (!formData.content.trim()) {
      toast.error("Vui lòng nhập nội dung đánh giá!");
      return;
    }

    if (!formData.rate) {
      toast.error("Vui lòng chọn đánh giá sao!");
      return;
    }

    const newReview = {
      name: formData.name,
      email: formData.email,
      content: formData.content,
      rate: formData.rate,
      date: new Date().toISOString().split("T")[0],
      activeReview: 1,
    };

    try {
      const response = await axios.post(
        `http://localhost:5000/api/reviews/${productId}`,
        newReview,
      );
      if (response.data.success) {
        setReviews([newReview, ...reviews]);
        setFormData({ name: "", email: "", content: "", rate: 0 });
        setShowForm(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi gửi đánh giá.");
    }
  };

  const formatDate = (dateStr) => {
    try {
      console.log("Date before: ", dateStr);
      const date = new Date(dateStr); // Chuyển chuỗi ISO thành Date object
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }
      // Định dạng ngày theo "dd tháng MM, yyyy"
      return new Intl.DateTimeFormat("vi-VN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(date);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Ngày không hợp lệ"; // Giá trị mặc định nếu có lỗi
    }
  };

  return (
    <div className="mt-20 flex min-h-screen w-full flex-col p-4 md:p-0">
      <h2 className="mb-4 flex font-josefin text-4xl font-bold text-[#663402]">
        Đánh giá sản phẩm
      </h2>
      <div className="flex w-full max-w-6xl flex-col md:flex-row">
        {reviews.length > 0 && (
          <div className="w-full md:w-1/2">
            <div className="max-h-[550px] overflow-y-auto">
              {reviews
                .filter((review) => review.activeReview === 1)
                .slice(0, 5)
                .map((review) => (
                  <div
                    key={review._id}
                    className="mb-4 rounded-xl border-2 bg-white p-4 shadow-sm"
                  >
                    <div className="mb-2 text-2xl text-yellow-500">
                      {"★".repeat(review.rate)}
                      {"☆".repeat(5 - review.rate)}
                    </div>
                    <div className="mb-2 flex font-josefin text-gray-500">
                      <span className="text-xl font-bold text-black">
                        {review.name} -{" "}
                        <span className="text-lg text-gray-600">
                          {formatDate(review.createdAt)}
                        </span>
                      </span>
                    </div>
                    <p className="mt-4 font-josefin text-lg">
                      {review.content}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}
        <div
          className={`w-full ${reviews.length > 0 ? "md:w-1/2 md:pl-8" : ""}`}
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col border-2 border-[#d88453] bg-white p-6 shadow-lg"
          >
            <h3 className="mb-4 font-josefin text-3xl font-bold text-[#663402]">
              {reviews.length > 0
                ? "Thêm đánh giá mới"
                : "Hãy là người đánh giá sản phẩm này đầu tiên!!!"}
            </h3>

            <div className="mb-4 flex items-center">
              <span className="mt-3 font-josefin text-xl font-semibold">
                Đánh giá:
              </span>
              <div className="ml-4 flex">
                {[1, 2, 3, 4, 5].map((num) => (
                  <span
                    key={num}
                    onClick={() => handleStarClick(num)}
                    className={`cursor-pointer text-4xl ${
                      num <= formData.rate ? "text-yellow-500" : "text-black"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <label className="mb-2">
              <span className="mt-3 font-josefin text-xl font-semibold">
                Nội dung:
              </span>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                className="mt-5 block w-full max-w-full resize border-2 p-2 font-josefin text-xl"
                rows={4}
              ></textarea>
            </label>

            <div className="mb-8 mt-6 flex gap-4">
              <div className="w-1/2">
                <label>
                  <span className="font-josefin text-xl font-semibold">
                    Tên:
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-4 block w-full border-2 p-3 font-josefin text-lg"
                  />
                </label>
              </div>
              <div className="w-1/2">
                <label>
                  <span className="font-josefin text-xl font-semibold">
                    Email:
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-4 block w-full border-2 p-3 font-josefin text-lg"
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-1/2 bg-[#d88453] px-2 pb-3 pt-4 font-josefin text-xl text-white transition-transform duration-200 hover:scale-95 md:w-1/3"
            >
              Gửi đánh giá
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Review;
