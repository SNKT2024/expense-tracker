import React, { useEffect, useState } from "react";
import apiClient from "../../utils/axiosInstance";
import { ArrowUp, ArrowDown } from "lucide-react";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0 });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await apiClient.get("/api/transaction/get-average");

        setTransactions(data.monthly || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTransactions();
  }, []);

  useEffect(() => {
    let income = 0,
      expense = 0;

    transactions.forEach((txn) => {
      if (txn.transactionType === "income") income += txn.amount;
      else if (txn.transactionType === "expense") expense += txn.amount;
    });

    setSummary({ income, expense });
  }, [transactions]);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-auto">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Income Card */}
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300 flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-full">
            <ArrowUp className="text-green-600" />
          </div>
          <div>
            <h2 className="text-gray-600 font-medium">Income (Monthly)</h2>
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
            <h2 className="text-gray-600 font-medium">Expense (Monthly)</h2>
            <p className="text-3xl font-bold text-red-600">
              ₹{summary.expense}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
