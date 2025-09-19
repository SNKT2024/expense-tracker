import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../utils/axiosInstance";

function AddAccount() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    balance: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await apiClient.post("/api/accounts", formData);
      setSuccess("Account added successfully!");
      setTimeout(() => {
        navigate("/accounts");
      }, 1000);
    } catch (error) {
      setError(error.response.data.msg);
    } finally {
      setLoading(false);
    }
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
              Select account type
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
      </form>
    </div>
  );
}

export default AddAccount;
