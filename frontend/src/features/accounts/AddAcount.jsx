import React, { useState } from "react";
import useUser from "../../hooks/getUserData";
import apiClient from "../../utils/axiosInstance";
import { updateAccounts } from "../../hooks/getUserData";
import { useLocation, useNavigate } from "react-router";

function AddAccount() {
  const user = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const fromAcc = location.state?.from?.pathname || "/accounts";

  const [formData, setFormData] = useState({
    user: "",
    name: "",
    type: "",
    balance: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError("");
    setSuccess("");
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.type || !formData.balance) {
      setError("Please fill in all required fields");
      return;
    }

    if (!user || !user._id) {
      setError("User not found. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      const res = await apiClient.post(`api/account/add-account`, formData);

      if (res.data?.success === false || !res.data?.data?._id) {
        setError(res.data?.msg || "Account creation failed");
        setLoading(false);
        return;
      }

      const newAccId = res.data.data._id;
      updateAccounts(newAccId);

      setSuccess(res.data.msg || "Account added successfully!");

      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    } catch (error) {
      console.error(error);
      setError("Something went wrong while adding account");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      user: "",
      name: "",
      type: "",
      balance: "",
    });
    setError("");
    setSuccess("");
    navigate(fromAcc, { replace: true });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Add New Account
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Account Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="e.g., Savings, Current"
            value={formData.name}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Account Type
          </label>
          <select
            id="type"
            value={formData.type}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition bg-white"
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a type
            </option>
            <option value="bank">Bank</option>
            <option value="cash">Cash</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="balance"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Initial Balance
          </label>
          <input
            id="balance"
            type="number"
            placeholder="e.g., 1000"
            min="0"
            step="0.01"
            value={formData.balance}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition"
        >
          {loading ? "Saving..." : "Save Account"}
        </button>

        {user?.accounts?.length ? (
          <p className="text-center text-sm text-gray-600">
            <button
              type="button"
              onClick={handleCancel}
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
            >
              Cancel
            </button>
          </p>
        ) : null}
      </form>
    </div>
  );
}

export default AddAccount;
