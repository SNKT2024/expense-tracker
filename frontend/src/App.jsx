import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./features/dashboard/Dashboard";
import Accounts from "./features/accounts/Accounts";
import Transactions from "./features/transactions/Transactions";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddAccount from "./features/accounts/AddAcount";
import AddTransaction from "./features/transactions/AddTransaction";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <MainLayout />
            </ProtectedRoutes>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="add-account" element={<AddAccount />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="add-transaction" element={<AddTransaction />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
