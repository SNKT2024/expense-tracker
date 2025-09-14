import React, { useState, useEffect } from "react";
import apiClient from "../../utils/axiosInstance";
import { useLocation, useNavigate } from "react-router";

function AddTransaction() {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
    name: "",
    transactionType: "",
    paymentMethod: "",
    amount: "",
    account: "",
    category: "",
    description: "",
    date: "",
  });

  // Fetch accounts on mount
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await apiClient.get("/api/account/user-accounts");
        if (res.data?.data) {
          setAccounts(res.data.data || []);
        } else {
          setError(res.data?.msg || "Failed to fetch accounts");
        }
      } catch (err) {
        setError("Error fetching accounts");
      }
    };
    fetchAccounts();
  }, []);

  // Handle changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Autofill on account change
    if (id === "account") {
      const selectedAcc = accounts.find((acc) => acc._id === value);
      if (selectedAcc) {
        setFormData((prev) => ({
          ...prev,
          account: selectedAcc._id,
          paymentMethod: selectedAcc.type === "cash" ? "cash" : "upi",
        }));
      }
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const payload = {
        ...formData,
        amount: Number(formData.amount),
        description:
          formData.description && formData.description.trim() !== ""
            ? formData.description
            : "No description added",
        date:
          formData.date && formData.date.trim() !== ""
            ? formData.date
            : new Date().toISOString().split("T")[0],
      };

      const res = await apiClient.post(
        "/api/transaction/add-transaction",
        payload
      );
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);

      if (res.data?.status) {
        setSuccess(res.data.msg || "Transaction added successfully!");
        setFormData({
          name: "",
          transactionType: "",
          paymentMethod: "",
          amount: "",
          account: "",
          category: "",
          description: "",
          date: "",
        });
      } else {
        setError(res.data?.msg || "Failed to add transaction");
      }
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
            <option value="" disabled>
              Select a type
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
            <option value="Outgoing">Outgoing</option>
            <option value="Movie">Movie</option>
            <option value="Shopping">Shopping</option>
            <option value="Self">Self</option>
            <option value="Others">Others</option>
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
            <option value="" disabled>
              Select a method
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
