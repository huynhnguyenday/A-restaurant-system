import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import AddAccount from "./AddAccount"; // Đảm bảo file AddAccount.js được import chính xác
import axios from "axios";

const ManageAccount = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddFormVisible, setAddFormVisible] = useState(false);

  useEffect(() => {
    // Lấy danh sách tài khoản từ API
    axios.get("http://localhost:5000/api/accounts")
      .then((response) => {
        setAccounts(response.data.data); // Assumed the response is in `data` key
      })
      .catch((error) => {
        console.error("There was an error fetching the accounts:", error);
      });
  }, []);  // Chạy khi component mount

  const filteredAccounts = accounts.filter((account) =>
    account.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.gmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleActiveStatus = (id) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account._id === id ? { ...account, isActive: !account.isActive } : account
      )
    );

    // Cập nhật trạng thái active của tài khoản trong cơ sở dữ liệu
    axios.put(`http://localhost:5000/api/accounts/${id}`, { isActive: !account.isActive })
      .catch((error) => console.error("Error updating active status:", error));
  };

  const handleAddAccount = (newAccount) => {
    // Thêm tài khoản mới vào cơ sở dữ liệu và UI
    axios.post("http://localhost:5000/api/accounts", newAccount)
      .then((response) => {
        setAccounts([...accounts, response.data.data]);
      })
      .catch((error) => console.error("Error adding account:", error));
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-gray-50">
      <div className="w-full max-w-7xl bg-white p-6 rounded-lg shadow-lg">
        <div className="text-2xl font-bold mb-4 text-center">Account Management</div>

        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by Username, Role or Gmail"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-72"
          />
          <div className="relative group">
            <button
              onClick={() => setAddFormVisible(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <span
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-sm rounded-md px-4 py-2 shadow-lg whitespace-nowrap"
            >
              Add Account
            </span>
          </div>
        </div>

        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Username</th>
                <th className="py-2 px-4 text-center">Number</th>
                <th className="py-2 px-4 text-left">Gmail</th>
                <th className="py-2 px-4 text-center">Role</th>
                <th className="py-2 px-4 text-center">Date Create</th>
                <th className="py-2 px-4 text-center">Date Update</th>
                <th className="py-2 px-4 text-center">Active</th>
                <th className="py-2 px-4 text-center">Edit</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account) => (
                <tr key={account._id} className="border-b">
                  <td className="py-6 px-4 font-bold">{account.username}</td>
                  <td className="py-6 px-4 text-center">{account.numbers}</td>
                  <td className="py-6 px-4">{account.gmail}</td>
                  <td className="py-6 px-4 text-center capitalize">{account.role}</td>
                  <td className="py-6 px-4 text-center">{new Date(account.createdAt).toLocaleDateString()}</td>
                  <td className="py-6 px-4 text-center">{new Date(account.updatedAt).toLocaleDateString()}</td>
                  <td className="py-6 px-4 text-center">
                    <FontAwesomeIcon
                      icon={account.isActive ? faToggleOn : faToggleOff}
                      className={account.isActive ? "text-green-500 text-2xl cursor-pointer" : "text-gray-400 text-2xl cursor-pointer"}
                      onClick={() => toggleActiveStatus(account._id)}
                    />
                  </td>
                  <td className="py-2 px-4 text-center">
                    <button className="text-blue-700 px-3 py-1 text-center rounded-md hover:bg-slate-300 hover:rounded-full">
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isAddFormVisible && (
          <AddAccount
            onAddAccount={handleAddAccount}
            onClose={() => setAddFormVisible(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ManageAccount;
