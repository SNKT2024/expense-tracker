import React from "react";
import Charts from "./Charts";
import Spent from "./Spent";
import Transactions from "../transactions/Transactions";
import { useAuth } from "../../hooks/AuthContext";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user && user.accounts.length === 0 ? (
    <Navigate to="/add-account" />
  ) : (
    <div className="h-auto">
      <div className="bg-white rounded-2xl shadow p-4 mb-4">
        <Spent />
      </div>
      <div className="bg-white rounded-2xl shadow p-4">
        <Transactions />
      </div>
    </div>
  );
}

export default Dashboard;
