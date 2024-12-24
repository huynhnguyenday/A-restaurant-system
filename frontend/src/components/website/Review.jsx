import { useState } from "react";
import { toast } from "react-toastify";

const Review = () => {
  const [reviews, setReviews] = useState([
    {
      name: "Nguyen Van A",
      date: "2024-12-23",
      content: "Sản phẩm rất tốt, đáng mua!",
      rate: 5,
    },
    {
      name: "Tran Thi B",
      date: "2024-12-20",
      content: "Hàng nhận được đúng như mô tả, rất hài lòng.",
      rate: 4,
    },
  ]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
    rate: 0,
  });

  const [showForm, setShowForm] = useState(reviews.length === 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStarClick = (rate) => {
    setFormData({ ...formData, rate });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data on submit:", formData);

    // Kiểm tra các trường
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
      ...formData,
      date: new Date().toISOString().split("T")[0],
    };

    setReviews([newReview, ...reviews]);
    setFormData({ name: "", email: "", content: "", rate: 1 });
    setShowForm(false);
  };


  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="flex min-h-screen w-full flex-col p-4 mt-20 md:p-0">
      <h2 className="mb-4 flex font-josefin text-4xl font-bold text-[#663402]">
        Đánh giá sản phẩm
      </h2>
      <div
        className={`flex w-full max-w-6xl flex-col ${
          reviews.length > 0 ? "md:flex-row" : ""
        }`}
      >
        {reviews.length > 0 && (
          <div className="w-full md:w-1/2">
            {reviews.map((review, index) => (
              <div
                key={index}
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
                      {formatDate(review.date)}
                    </span>
                  </span>
                </div>
                <p className="mt-4 font-josefin text-lg">{review.content}</p>
              </div>
            ))}
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
                className="mt-5 block font-josefin text-xl w-full max-w-full resize border-2 p-2"
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
                    className="mt-4 block font-josefin text-lg w-full border-2 p-3"
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
                    className="mt-4 block w-full text-lg font-josefin border-2 p-3"
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-1/2 md:w-1/3 bg-[#d88453] px-2 pb-3 pt-4 font-josefin text-xl text-white transition-transform duration-200 hover:scale-95"
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
