import { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const placeholderOrders = [
  {
    id: "1",
    name: "Nguyen Van A",
    address: "123 Đường ABC, Quận 1, TP. HCM",
    number: "0987654321",
    email: "nguyenvana@example.com",
    note: "Giao vào buổi tối",
    paymentMethod: "COD",
    cart: [
      {
        product: {
          image: "imgfood3",
          name: "Sản phẩm 7",
          sell_price: 100000,
        },
        quantity: 20,
        totalPrice: 200000,
      },
      {
        product: {
          image: "imgfood4",
          name: "Sản phẩm 2",
          sell_price: 150000,
        },
        quantity: 3,
        totalPrice: 450000,
      },
    ],
    orderDate: "2024-01-15",
  },
];

const ManageChart = () => {
  // Calculate yesterday's date for default pie chart filter
  const getYesterday = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // Set date to one day before
    yesterday.setHours(0, 0, 0, 0); // Set time to 00:00 to normalize the date
    return yesterday;
  };

  const [revenueStartDate, setRevenueStartDate] = useState(getYesterday());
  const [revenueEndDate, setRevenueEndDate] = useState(getYesterday());
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [{ label: "Doanh thu", data: [] }],
  });
  const [filteredTopProducts, setFilteredTopProducts] = useState([]);
  const [pieStartDateTopProducts, setPieStartDateTopProducts] =
    useState(getYesterday()); // Default to yesterday
  const [pieEndDateTopProducts, setPieEndDateTopProducts] =
    useState(getYesterday()); // Default to yesterday
  const [filteredBottomProducts, setFilteredBottomProducts] = useState([]);
  const [pieStartDateLessProucts, setPieStartDateLessProucts] =
    useState(getYesterday()); // Default to yesterday
  const [pieEndDateLessProucts, setPieEndDateLessProucts] =
    useState(getYesterday());

  const calculateRevenueData = () => {
    const filteredOrders = placeholderOrders.filter((order) => {
      const orderDate = new Date(order.orderDate);
      const normalizedStartDate = new Date(revenueStartDate);
      normalizedStartDate.setHours(0, 0, 0, 0);

      const normalizedEndDate = new Date(revenueEndDate);
      normalizedEndDate.setHours(23, 59, 59, 999);

      return orderDate >= normalizedStartDate && orderDate <= normalizedEndDate;
    });

    const labels = [];
    const revenue = [];

    filteredOrders.forEach((order) => {
      const orderDate = order.orderDate;
      const dateLabel = new Date(orderDate).toLocaleDateString("vi-VN");
      const orderRevenue = order.cart.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      );

      const existingIndex = labels.indexOf(dateLabel);
      if (existingIndex >= 0) {
        revenue[existingIndex] += orderRevenue;
      } else {
        labels.push(dateLabel);
        revenue.push(orderRevenue);
      }
    });

    setRevenueData({
      labels,
      datasets: [
        {
          label: "Doanh thu",
          data: revenue,
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 3,
        },
      ],
    });
  };

  useEffect(() => {
    calculateRevenueData();
  }, [revenueStartDate, revenueEndDate]);

  const getTopProducts = () => {
    const productSales = {};

    // Filter orders based on the date range (using pieStartDate and pieEndDate)
    const filteredOrders = placeholderOrders.filter((order) => {
      const orderDate = new Date(order.orderDate);
      const normalizedStartDate = new Date(
        pieStartDateTopProducts.setHours(0, 0, 0, 0),
      );
      const normalizedEndDate = new Date(
        pieEndDateTopProducts.setHours(23, 59, 59, 999),
      );
      return orderDate >= normalizedStartDate && orderDate <= normalizedEndDate;
    });

    // Aggregate sales for each product
    filteredOrders.forEach((order) => {
      order.cart.forEach((item) => {
        const productName = item.product.name;
        if (!productSales[productName]) {
          productSales[productName] = 0;
        }
        productSales[productName] += item.quantity;
      });
    });

    // Sort products by quantity sold and get the top 5
    const sortedProducts = Object.entries(productSales)
      .map(([name, quantity]) => ({ name, quantity }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    setFilteredTopProducts(sortedProducts);
  };

  useEffect(() => {
    getTopProducts();
  }, [pieStartDateTopProducts, pieEndDateTopProducts]);

  const topProductsChartData = {
    labels: filteredTopProducts.map((product) => product.name),
    datasets: [
      {
        label: "Số lượng bán",
        data: filteredTopProducts.map((product) => product.quantity),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const getBottomProducts = () => {
    const productSales = {};

    // Filter orders based on the date range (using pieStartDateLessProucts and pieEndDateLessProucts)
    const filteredOrders = placeholderOrders.filter((order) => {
      const orderDate = new Date(order.orderDate);
      const normalizedStartDate = new Date(pieStartDateLessProucts);
      normalizedStartDate.setHours(0, 0, 0, 0); // Normalize start date to midnight

      const normalizedEndDate = new Date(pieEndDateLessProucts);
      normalizedEndDate.setHours(23, 59, 59, 999); // Normalize end date to the end of the day

      return orderDate >= normalizedStartDate && orderDate <= normalizedEndDate;
    });

    // Aggregate sales for each product
    filteredOrders.forEach((order) => {
      order.cart.forEach((item) => {
        const productName = item.product.name;
        if (!productSales[productName]) {
          productSales[productName] = 0;
        }
        productSales[productName] += item.quantity;
      });
    });

    // Sort products by quantity sold and get the bottom 5
    const sortedProducts = Object.entries(productSales)
      .map(([name, quantity]) => ({ name, quantity }))
      .sort((a, b) => a.quantity - b.quantity) // Sort in ascending order
      .slice(0, 5);

    setFilteredBottomProducts(sortedProducts);
  };

  useEffect(() => {
    getBottomProducts(); // Fetch bottom products when date range changes
  }, [pieStartDateLessProucts, pieEndDateLessProucts]);

  const bottomProductsChartData = {
    labels: filteredBottomProducts.map((product) => product.name),
    datasets: [
      {
        label: "Số lượng bán",
        data: filteredBottomProducts.map((product) => product.quantity),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-gray-50 p-6">
      {/* Biểu đồ Doanh thu */}
      <div className="mb-4">
        <h2 className="text-center font-josefin text-4xl font-bold">
          Doanh thu cửa hàng
        </h2>
        <div className="mb-4 flex justify-center">
          <label className="mr-2 mt-2 font-josefin text-xl font-bold">
            Lọc Từ Ngày:{" "}
          </label>
          <DatePicker
            selected={revenueStartDate}
            onChange={(date) => setRevenueStartDate(date)}
            className="border border-gray-300 p-2 text-center"
          />
          <span className="mx-6 mt-2 font-josefin text-xl font-bold">
            Đến Ngày:
          </span>
          <DatePicker
            selected={revenueEndDate}
            onChange={(date) => setRevenueEndDate(date)}
            className="border border-gray-300 p-2 text-center"
          />
        </div>
      </div>

      {/* Line Chart */}
      <div className="mb-16 w-11/12">
        <Line data={revenueData} />
      </div>

      {/* Biểu đồ Pie cho Top 5 sản phẩm bán chạy nhất */}
      <div className="mt-8 flex flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 font-josefin text-4xl font-bold">
            Top 5 Sản Phẩm Bán Chạy Nhất
          </h2>
        </div>
        <div className="mb-4 flex justify-center">
          <label className="mr-2 mt-2 font-josefin text-xl font-bold">
            Lọc Từ Ngày:{" "}
          </label>
          <DatePicker
            selected={pieStartDateTopProducts}
            onChange={(date) => setPieStartDateTopProducts(date)}
            className="border border-gray-300 p-2 text-center"
          />
          <span className="mx-6 mt-2 font-josefin text-xl font-bold">
            Đến Ngày:
          </span>
          <DatePicker
            selected={pieEndDateTopProducts}
            onChange={(date) => setPieEndDateTopProducts(date)}
            className="border border-gray-300 p-2 text-center"
          />
        </div>

        {/* Pie Chart for Top 5 Products */}
        <div className="mb-6 mt-4 w-full md:w-4/5">
          <Bar data={topProductsChartData} />
        </div>
      </div>

      <div className="mt-11 flex flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 font-josefin text-4xl font-bold">
            Top 5 Sản Phẩm Bán Ít Nhất
          </h2>
        </div>
        <div className="mb-4 flex justify-center">
          <label className="mr-2 mt-2 font-josefin text-xl font-bold">
            Lọc Từ Ngày:{" "}
          </label>
          <DatePicker
            selected={pieStartDateLessProucts}
            onChange={(date) => setPieStartDateLessProucts(date)}
            className="border border-gray-300 p-2 text-center"
          />
          <span className="mx-6 mt-2 font-josefin text-xl font-bold">
            Đến Ngày:
          </span>
          <DatePicker
            selected={pieEndDateLessProucts}
            onChange={(date) => setPieEndDateLessProucts(date)}
            className="border border-gray-300 p-2 text-center"
          />
        </div>

        {/* Pie Chart for Top 5 Products */}
        <div className="mb-6 mt-4 w-full md:w-4/5">
          <Bar data={bottomProductsChartData} />
        </div>
      </div>
    </div>
  );
};

export default ManageChart;
