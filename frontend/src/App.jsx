import { Navigate, Route, Routes } from "react-router";
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
          <Route
            index
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/accounts"
            element={
              <ProtectedRoutes>
                <Accounts />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/add-account"
            element={
              <ProtectedRoutes>
                <AddAccount />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoutes>
                <Transactions />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/add-transaction"
            element={
              <ProtectedRoutes>
                <AddTransaction />
              </ProtectedRoutes>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
