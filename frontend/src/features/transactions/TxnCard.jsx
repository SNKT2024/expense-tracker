import React, { useState } from "react";
import { ChevronDown, ChevronUp, Pencil, Trash } from "lucide-react";
import { Link } from "react-router";

function TxnCard({ transactions, onEdit, onDelete }) {
  const [openTxn, setOpenTxn] = useState(null);

  const toggleDescription = (txnId) => {
    setOpenTxn(openTxn === txnId ? null : txnId);
  };

  // Group transactions by date
  const grouped = transactions.reduce((groups, txn) => {
    const dateKey = new Date(txn.date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(txn);
    return groups;
  }, {});

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const calculateDailySummary = (txns) => {
    const expense = txns
      .filter((t) => t.transactionType === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);
    const income = txns
      .filter((t) => t.transactionType === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);
    const gap = income - expense;
    return { income, expense, gap };
  };

  if (transactions.length === 0) {
    return (
      <div className="px-3 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition w-fit mx-auto">
        <Link to={"/add-transaction"}>Create Your First Transaction</Link>
      </div>
    );
  }

  return (
    <>
      {Object.keys(grouped).map((dateKey) => {
        const dailySummary = calculateDailySummary(grouped[dateKey]);

        return (
          <div
            className="bg-white text-black w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto shadow-lg rounded-2xl p-4 border mb-4"
            key={dateKey}
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              {dateKey}
            </h2>

            <div className="space-y-4">
              {grouped[dateKey].map((txn) => (
                <div key={txn._id} className="border-b border-gray-200 py-2">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-gray-800 font-medium">
                        {txn.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {txn.paymentMethod} • {txn.accountName || ""} •{" "}
                        {formatTime(txn.date)}
                      </span>

                      <div className="flex gap-3 mt-1 sm:hidden">
                        <button
                          onClick={() => onEdit(txn)}
                          className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => onDelete(txn)}
                          className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                        >
                          <Trash size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-2">
                      <span
                        className={`font-semibold whitespace-nowrap ${
                          txn.transactionType === "expense"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {txn.transactionType === "expense" ? "-" : "+"}₹
                        {txn.amount}
                      </span>

                      <button
                        onClick={() => toggleDescription(txn._id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {openTxn === txn._id ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </button>

                      <div className="hidden sm:flex gap-2">
                        <button
                          onClick={() => onEdit(txn)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => onDelete(txn)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {openTxn === txn._id && txn.description && (
                    <div className="mt-2 text-xs text-gray-600 bg-gray-50 p-2 rounded">
                      {txn.description}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-3 pt-2 border-t border-gray-300 flex justify-between text-sm">
              <div className="flex flex-col text-left">
                <span className="text-green-600 font-medium">
                  Income: +₹{dailySummary.income}
                </span>
                <span className="text-red-600 font-medium">
                  Expense: -₹{dailySummary.expense}
                </span>
              </div>
              <span className="font-bold text-blue-600 self-center">
                Balance: ₹{dailySummary.gap}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default TxnCard;
