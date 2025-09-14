import React from "react";
import Charts from "./Charts";
import Spent from "./Spent";
import Transactions from "../transactions/Transactions";
import useUser from "../../hooks/getUserData";
import AddAcount from "../accounts/AddAcount";
import { Navigate } from "react-router";

function Dashboard() {
  const user = useUser();

  return user.accounts.length === 0 ? (
    <Navigate to={"/add-account"} />
  ) : (
    <div className=" h-auto ">
      <div className="bg-white rounded-2xl shadow p-4">
        <Charts />
      </div>
      <div className="bg-white rounded-2xl shadow p-4">
        <Spent />
      </div>
      <div className="bg-white rounded-2xl shadow p-4">
        <Transactions />
      </div>
    </div>
  );
}

export default Dashboard;
