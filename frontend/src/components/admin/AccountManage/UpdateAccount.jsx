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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 flex justify-center text-4xl font-bold">
          Update Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-1 block font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={updatedAccount.username}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={updatedAccount.password}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block font-medium">Gmail</label>
            <input
              type="email"
              name="gmail"
              value={updatedAccount.gmail}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block font-medium">Phone Number</label>
            <input
              type="text"
              name="numbers"
              value={updatedAccount.numbers}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="mb-4">
            <label className="mb-1 block font-medium">Role</label>
            <select
              name="role"
              value={updatedAccount.role}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 p-2"
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
              className="rounded-md bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
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
