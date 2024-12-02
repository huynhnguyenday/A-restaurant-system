import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import AddAccount from "./AddAccount"; // Đảm bảo file AddAccount.js được import chính xác

const initialAccounts = [
  { id: 1, username: "admin01", password: "adminpass", gmail: "admin01@gmail.com", number: "0123456789", createAT: "30-11-2024", updateAt: "30-11-2024", isActive: true, role: "admin" },
  { id: 2, username: "staff01", password: "staffpass", gmail: "staff01@gmail.com", number: "0987654321", createAT: "30-11-2024", updateAt: "30-11-2024", isActive: false, role: "staff" },
  { id: 3, username: "customer01", password: "customerpass", gmail: "customer01@gmail.com", number: "1234567890", createAT: "30-11-2024", updateAt: "30-11-2024", isActive: true, role: "customer" },
  { id: 4, username: "staff02", password: "staffpass", gmail: "staff02@gmail.com", number: "9876543210", createAT: "30-11-2024", updateAt: "30-11-2024", isActive: true, role: "staff" },
  { id: 5, username: "customer02", password: "customerpass", gmail: "customer02@gmail.com", number: "4567890123", createAT: "30-11-2024", updateAt: "30-11-2024", isActive: false, role: "customer" },
];

const ManageAccount = () => {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddFormVisible, setAddFormVisible] = useState(false);

  const filteredAccounts = accounts.filter((account) =>
    account.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.gmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleActiveStatus = (id) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.id === id ? { ...account, isActive: !account.isActive } : account
      )
    );
  };

  const handleAddAccount = (newAccount) => {
    setAccounts([...accounts, newAccount]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-gray-50">
      <div className="w-full max-w-7xl bg-white p-6 rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="text-2xl font-bold mb-4 text-center">Account Management</div>

        {/* Search and Add Account */}
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

        {/* Account Table */}
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
                <tr key={account.id} className="border-b">
                  <td className="py-6 px-4 font-bold">{account.username}</td>
                  <td className="py-6 px-4 text-center">{account.number}</td>
                  <td className="py-6 px-4">{account.gmail}</td>
                  <td className="py-6 px-4 text-center capitalize">{account.role}</td>
                  <td className="py-6 px-4 text-center">{account.createAT}</td>
                  <td className="py-6 px-4 text-center">{account.updateAt}</td>
                  <td className="py-6 px-4 text-center">
                    <FontAwesomeIcon
                      icon={account.isActive ? faToggleOn : faToggleOff}
                      className={account.isActive ? "text-green-500 text-2xl cursor-pointer" : "text-gray-400 text-2xl cursor-pointer"}
                      onClick={() => toggleActiveStatus(account.id)}
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

        {/* Add Account Form */}
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
