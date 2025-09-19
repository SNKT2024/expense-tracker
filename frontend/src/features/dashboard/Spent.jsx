import React, { useEffect, useState } from "react";
import apiClient from "../../utils/axiosInstance";
import { ArrowUp, ArrowDown, Wallet } from "lucide-react";

function Spent() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
    shortfall: 0,
  });
  const [view, setView] = useState("monthly"); // "monthly" | "weekly"

  // Fetch transactions whenever `view` changes
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const endpoint =
          view === "monthly"
            ? "/api/transactions/monthly"
            : "/api/transactions/weekly";

        const { data } = await apiClient.get(endpoint);

        const txns =
          view === "monthly" ? data.monthly || [] : data.pastSevenDays || [];

        setTransactions(txns);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTransactions();
  }, [view]);

  // Calculate summary
  useEffect(() => {
    let income = 0,
      expense = 0;

    transactions.forEach((txn) => {
      if (txn.transactionType === "income") income += txn.amount;
      else if (txn.transactionType === "expense") expense += txn.amount;
    });

    const shortfall = expense - income;
    const balance = expense - shortfall; // leaves "what I have to myself"

    setSummary({ income, expense, balance, shortfall });
  }, [transactions]);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-auto">
      {/* Toggle Buttons */}
      <div className="flex justify-center mb-4 space-x-3">
        <button
          onClick={() => setView("monthly")}
          className={`px-4 py-2 rounded-lg font-medium ${
            view === "monthly"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setView("weekly")}
          className={`px-4 py-2 rounded-lg font-medium ${
            view === "weekly"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Past 7 Days
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Income Card */}
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300 flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-full">
            <ArrowUp className="text-green-600" />
          </div>
          <div>
            <h2 className="text-gray-600 font-medium">
              Income ({view === "monthly" ? "Monthly" : "Past 7 Days"})
            </h2>
            <p className="text-3xl font-bold text-green-600">
              ₹{summary.income}
            </p>
          </div>
        </div>

        {/* Expense Card */}
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300 flex items-center space-x-4">
          <div className="bg-red-100 p-3 rounded-full">
            <ArrowDown className="text-red-600" />
          </div>
          <div>
            <h2 className="text-gray-600 font-medium">
              Expense ({view === "monthly" ? "Monthly" : "Past 7 Days"})
            </h2>
            <p className="text-3xl font-bold text-red-600">
              ₹{summary.expense}
            </p>
          </div>
        </div>

        {/* Balance Card */}
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300 flex flex-col space-y-2">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Wallet className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-gray-600 font-medium">
                Balance ({view === "monthly" ? "Monthly" : "Past 7 Days"})
              </h2>
              <p className={`text-3xl font-bold text-blue-600`}>
                ₹{summary.balance}
              </p>
            </div>
          </div>

          {/* Breakdown */}
          {/* <p className="text-sm text-gray-600 mt-2">
            Earned (₹{summary.income}) – Spent (₹{summary.expense}) = Shortfall
            (₹{summary.shortfall}) <br />
            Then Spent (₹{summary.expense}) – Shortfall (₹{summary.shortfall}) =
            Balance (₹{summary.balance})
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default Spent;
