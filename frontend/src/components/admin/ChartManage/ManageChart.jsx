import React, { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
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
import DateTimePicker from "react-datetime-picker"; // Keep DateTimePicker for revenue chart
import DatePicker from "react-datepicker"; // Import react-datepicker
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

const ManageChart = () => {
  // State cho thời gian của các biểu đồ
  const [timeRange, setTimeRange] = useState("month"); // Dùng cho biểu đồ doanh thu
  const [startDateTopProducts, setStartDateTopProducts] = useState(new Date());
  const [endDateTopProducts, setEndDateTopProducts] = useState(new Date());
  const [startDateBottomProducts, setStartDateBottomProducts] = useState(
    new Date(),
  );
  const [endDateBottomProducts, setEndDateBottomProducts] = useState(
    new Date(),
  );
  const [startDateTopCustomers, setStartDateTopCustomers] = useState(
    new Date(),
  );
  const [endDateTopCustomers, setEndDateTopCustomers] = useState(new Date());

  // State cho dữ liệu của các biểu đồ
  const [topProductsData, setTopProductsData] = useState({
    labels: [],
    datasets: [{ label: "Số lượng bán", data: [] }],
  });
  const [bottomProductsData, setBottomProductsData] = useState({
    labels: [],
    datasets: [{ label: "Số lượng bán", data: [] }],
  });
  const [topCustomersData, setTopCustomersData] = useState({
    labels: [],
    datasets: [{ label: "Tổng chi tiêu", data: [] }],
  });
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [{ label: "Doanh thu", data: [] }],
  });

  // Dữ liệu giả cho các đơn hàng
  const placeholderOrders = [
    {
      id: "1",
      name: "Nguyen Van A",
      orderDate: "2024-01-15",
      cart: [
        {
          product: { name: "Sản phẩm 7", sell_price: 100000 },
          quantity: 20,
          totalPrice: 200000,
        },
        {
          product: { name: "Sản phẩm 2", sell_price: 150000 },
          quantity: 3,
          totalPrice: 450000,
        },
      ],
    },
    {
      id: "2",
      name: "Tran Thi B",
      orderDate: "2024-02-20",
      cart: [
        {
          product: { name: "Sản phẩm 3", sell_price: 200000 },
          quantity: 1,
          totalPrice: 200000,
        },
        {
          product: { name: "Sản phẩm 4", sell_price: 300000 },
          quantity: 2,
          totalPrice: 600000,
        },
        {
          product: { name: "Sản phẩm 7", sell_price: 100000 },
          quantity: 20,
          totalPrice: 200000,
        },
      ],
    },
  ];

  // Hàm lấy doanh thu theo thời gian (week, month, year)
  const getRevenueByTime = (timeRange) => {
    const revenueByTime = {
      week: {
        labels: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        data: new Array(7).fill(0),
      },
      month: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        data: new Array(4).fill(0),
      },
      year: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        data: new Array(12).fill(0),
      },
    };

    placeholderOrders.forEach((order) => {
      const orderDate = new Date(order.orderDate);
      const orderRevenue = order.cart.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      );

      if (timeRange === "week") {
        const dayOfWeek = orderDate.getDay();
        revenueByTime.week.data[dayOfWeek] += orderRevenue;
      }

      if (timeRange === "month") {
        const weekOfMonth = Math.floor(orderDate.getDate() / 7);
        revenueByTime.month.data[weekOfMonth] += orderRevenue;
      }

      if (timeRange === "year") {
        const month = orderDate.getMonth();
        revenueByTime.year.data[month] += orderRevenue;
      }
    });

    return revenueByTime[timeRange];
  };

  // Cập nhật các biểu đồ khi thời gian thay đổi
  useEffect(() => {
    const revenue = getRevenueByTime(timeRange);
    setRevenueData({
      labels: revenue.labels,
      datasets: [
        {
          label: "Doanh thu",
          data: revenue.data,
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });

    // Cập nhật biểu đồ Sản phẩm bán ít nhất
    const newBottomProductsData = {
      labels: [],
      datasets: [
        {
          label: "Số lượng bán",
          data: [],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(201, 203, 207, 0.6)",
          ],
        },
      ],
    };
    const productSales = {};
    placeholderOrders.forEach((order) => {
      order.cart.forEach((item) => {
        const productName = item.product.name;
        const productQuantity = item.quantity;
        if (!productSales[productName]) {
          productSales[productName] = productQuantity;
        } else {
          productSales[productName] += productQuantity;
        }
      });
    });

    const sortedProductSales = Object.entries(productSales).sort(
      (a, b) => a[1] - b[1],
    );
    const bottomProducts = sortedProductSales.slice(0, 5);

    bottomProducts.forEach(([productName, quantity]) => {
      newBottomProductsData.labels.push(productName);
      newBottomProductsData.datasets[0].data.push(quantity);
    });
    setBottomProductsData(newBottomProductsData);

    // Cập nhật biểu đồ Sản phẩm bán chạy
    const newTopProductsData = {
      labels: [],
      datasets: [
        {
          label: "Số lượng bán",
          data: [],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(201, 203, 207, 0.6)",
          ],
        },
      ],
    };

    const sortedTopProducts = Object.entries(productSales).sort(
      (a, b) => b[1] - a[1],
    );
    const topProducts = sortedTopProducts.slice(0, 5);

    topProducts.forEach(([productName, quantity]) => {
      newTopProductsData.labels.push(productName);
      newTopProductsData.datasets[0].data.push(quantity);
    });
    setTopProductsData(newTopProductsData);

    // Cập nhật biểu đồ Khách hàng chi tiêu nhiều nhất
    const customerSpending = {};
    placeholderOrders.forEach((order) => {
      const customerName = order.name;
      const orderTotal = order.cart.reduce(
        (sum, item) => sum + item.totalPrice,
        0,
      );
      if (!customerSpending[customerName]) {
        customerSpending[customerName] = orderTotal;
      } else {
        customerSpending[customerName] += orderTotal;
      }
    });

    const newTopCustomersData = {
      labels: [],
      datasets: [
        {
          label: "Tổng chi tiêu",
          data: [],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(201, 203, 207, 0.6)",
          ],
        },
      ],
    };

    const sortedTopCustomers = Object.entries(customerSpending).sort(
      (a, b) => b[1] - a[1],
    );
    const topCustomers = sortedTopCustomers.slice(0, 5);

    topCustomers.forEach(([customerName, spending]) => {
      newTopCustomersData.labels.push(customerName);
      newTopCustomersData.datasets[0].data.push(spending);
    });
    setTopCustomersData(newTopCustomersData);
  }, [
    timeRange,
    startDateTopProducts,
    endDateTopProducts,
    startDateBottomProducts,
    endDateBottomProducts,
    startDateTopCustomers,
    endDateTopCustomers,
  ]);

  // Cấu hình cho các biểu đồ
  const options = (chartType) => ({
    responsive: true,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: getChartTitle(chartType),
        font: { size: 24, family: "Josefin sans, sans-serif", weight: "bold" },
        color: "black",
      },
    },
  });

  const getChartTitle = (chartType) => {
    switch (chartType) {
      case "revenue":
        return `Doanh thu theo ${timeRange === "week" ? "Tuần" : timeRange === "month" ? "Tháng" : "Năm"}`;
      case "topProducts":
        return "Top 5 Sản phẩm bán chạy nhất";
      case "bottomProducts":
        return "Top 5 Sản phẩm bán ít nhất";
      case "topCustomers":
        return "Khách hàng chi tiêu nhiều nhất";
      default:
        return "";
    }
  };

  return (
    <div className="bg-gray-50 p-6">
      <h1 className="mb-4 text-2xl font-bold">Quản lý Biểu đồ</h1>

      {/* Biểu đồ Doanh thu */}
      <div className="mb-4">
        <label htmlFor="timeRange" className="font-medium">
          Chọn Thời gian:
        </label>
        <select
          id="timeRange"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="ml-2 rounded-md border border-gray-300 p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="week">Tuần</option>
          <option value="month">Tháng</option>
          <option value="year">Năm</option>
        </select>
      </div>

      <div className="mb-10 mt-10">
        <Line data={revenueData} options={options("revenue")} />
      </div>

      {/* Biểu đồ Top Sản phẩm */}
      <div className="mb-6">
        <div className="flex gap-4">
          <DatePicker
            selected={startDateTopProducts}
            onChange={(date) => setStartDateTopProducts(date)}
            dateFormat="yyyy-MM-dd"
            className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <DatePicker
            selected={endDateTopProducts}
            onChange={(date) => setEndDateTopProducts(date)}
            dateFormat="yyyy-MM-dd"
            className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Bar data={topProductsData} options={options("topProducts")} />
      </div>

      {/* Biểu đồ Sản phẩm Bán ít */}
      <div className="mb-6">
        <div className="flex gap-4">
          <DatePicker
            selected={startDateBottomProducts}
            onChange={(date) => setStartDateBottomProducts(date)}
            dateFormat="yyyy-MM-dd"
            className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <DatePicker
            selected={endDateBottomProducts}
            onChange={(date) => setEndDateBottomProducts(date)}
            dateFormat="yyyy-MM-dd"
            className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Bar data={bottomProductsData} options={options("bottomProducts")} />
      </div>

      {/* Biểu đồ Khách hàng chi tiêu nhiều */}
      <div className="mb-6 w-1/2">
        <div className="flex gap-4">
          <DatePicker
            selected={startDateTopCustomers}
            onChange={(date) => setStartDateTopCustomers(date)}
            dateFormat="yyyy-MM-dd"
            className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <DatePicker
            selected={endDateTopCustomers}
            onChange={(date) => setEndDateTopCustomers(date)}
            dateFormat="yyyy-MM-dd"
            className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Pie data={topCustomersData} options={options("topCustomers")} />
      </div>
    </div>
  );
};

export default ManageChart;
