import React, { useState } from "react";

const AddAccount = ({ onAddAccount, onClose }) => {
  const [newAccount, setNewAccount] = useState({
    username: "",
    password: "",
    gmail: "",
    number: "",
    role: "customer", // Default role
    isActive: true, // Default active status
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccount({ ...newAccount, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !newAccount.username ||
      !newAccount.password ||
      !newAccount.gmail ||
      !newAccount.number
    ) {
      alert("Please fill in all fields.");
      return;
    }
    const date = new Date().toLocaleDateString("en-GB"); // Format: DD-MM-YYYY
    onAddAccount({
      ...newAccount,
      id: Date.now(),
      createAT: date,
      updateAt: date,
    });
    onClose(); // Close form after submission
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={newAccount.username}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={newAccount.password}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Gmail</label>
            <input
              type="email"
              name="gmail"
              value={newAccount.gmail}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Phone Number</label>
            <input
              type="text"
              name="number"
              value={newAccount.number}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Role</label>
            <select
              name="role"
              value={newAccount.role}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md w-full p-2"
            >
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
              <option value="customer">Customer</option> 
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccount;
