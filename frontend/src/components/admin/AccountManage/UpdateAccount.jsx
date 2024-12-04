import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateAccount = ({ account, onClose, onUpdateAccount }) => {
  const [updatedAccount, setUpdatedAccount] = useState(account);

  useEffect(() => {
    setUpdatedAccount(account);
  }, [account]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAccount({ ...updatedAccount, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !updatedAccount.username ||
      !updatedAccount.password ||
      !updatedAccount.gmail ||
      !updatedAccount.numbers ||
      !updatedAccount.role
    ) {
      alert("Please fill in all fields.");
      return;
    }

    axios
      .put(`http://localhost:5000/api/accounts/${updatedAccount._id}`, updatedAccount)
      .then((response) => {
        onUpdateAccount(updatedAccount); 
        onClose(); 
      })
      .catch((error) => {
        console.error("There was an error updating the account:", error);
      });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Update Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={updatedAccount.username}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={updatedAccount.password}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Gmail</label>
            <input
              type="email"
              name="gmail"
              value={updatedAccount.gmail}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Phone Number</label>
            <input
              type="text"
              name="numbers"
              value={updatedAccount.numbers}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Role</label>
            <select
              name="role"
              value={updatedAccount.role}
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
              Update Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAccount;
