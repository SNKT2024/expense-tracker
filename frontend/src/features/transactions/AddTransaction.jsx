import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../utils/axiosInstance";

function AddTransaction() {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    transactionType: "",
    paymentMethod: "",
    amount: "",
    account: "",
    category: "",
    description: "",
    date: new Date(),
  });

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const { data } = await apiClient.get("/api/accounts");
        setAccounts(data.data);
      } catch (err) {
        setError("Error fetching accounts");
      }
    };
    fetchAccounts();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;

    // If user selects an account, auto-update paymentMethod
    if (id === "account") {
      const selectedAccount = accounts.find((acc) => acc._id === value);
      if (selectedAccount) {
        setFormData((prev) => ({
          ...prev,
          [id]: value,
          paymentMethod:
            selectedAccount.type.toLowerCase() === "bank" ? "upi" : "cash",
        }));
        return;
      }
    }

    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await apiClient.post("/api/transactions", formData);
      setSuccess("Transaction added successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setError("Something went wrong while adding transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white mx-auto shadow-lg rounded-lg p-8 w-full max-w-xl">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Add New Transaction
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

        {/* Account */}
        <div>
          <label
            htmlFor="account"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Account
          </label>
          <select
            id="account"
            value={formData.account}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition bg-white"
            required
          >
            <option value="" disabled>
              Select Account
            </option>
            {accounts.map((acc) => (
              <option key={acc._id} value={acc._id}>
                {acc.name} ({acc.type})
              </option>
            ))}
          </select>
        </div>

        {/* Transaction Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Transaction Name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Transaction Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Amount
          </label>
          <input
            id="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
          />
        </div>

        {/* Transaction Type */}
        <div>
          <label
            htmlFor="transactionType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Transaction Type
          </label>
          <select
            id="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition bg-white"
            required
          >
            <option value="" defaultValue selected disabled>
              Select Type
            </option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description (optional)
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add a note..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition bg-white"
            required
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="Food">Food</option>
            <option value="Grocery">Grocery</option>
            <option value="Travel">Travel</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Payment Method */}
        <div>
          <label
            htmlFor="paymentMethod"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Payment Method
          </label>

          <select
            id="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition bg-white"
            required
          >
            <option value="" defaultValue selected disabled>
              Select Method
            </option>
            <option value="upi">UPI</option>
            <option value="cash">Cash</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date
          </label>
          <input
            id="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition"
        >
          {loading ? "Saving..." : "Add Transaction"}
        </button>
      </form>
    </div>
  );
}

export default AddTransaction;
