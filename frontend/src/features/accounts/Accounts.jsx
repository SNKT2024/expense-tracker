import React, { useEffect, useState } from "react";
import apiClient from "../../utils/axiosInstance";
import { Link } from "react-router";

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await apiClient.get("api/account/user-accounts");
        setAccounts(res.data?.data || []);
      } catch (err) {
        setError("Failed to fetch accounts");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  if (loading) return <p className="p-4">Loading accounts...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold">Your Accounts</h2>
        <Link
          to="/add-account"
          className="px-2 py-2 text-center rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          + Add Account
        </Link>
      </div>

      {accounts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border rounded-lg shadow-sm">
          <p className="text-gray-600 mb-4">No accounts found</p>
          <Link
            to="/add-account"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Create Your First Account
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((acc) => (
            <div
              key={acc._id}
              className="border rounded-xl p-5 shadow-md bg-white hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-3">
                <p className="text-lg font-semibold">{acc.name}</p>
                <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
                  {acc.type}
                </span>
              </div>
              <p
                className={`text-xl font-bold ${
                  acc.balance >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                ₹{acc.balance}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Accounts;
