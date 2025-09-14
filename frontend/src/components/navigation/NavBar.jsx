import React, { useState } from "react";
import { PiMoneyWavyFill } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";
import { useAuth } from "../../hooks/AuthContext";

function NavBar() {
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const { logout } = useAuth();

  return (
    <div className="flex justify-between items-center px-4 h-16 bg-white border-b border-gray-200 shadow-sm">
      {/* Left Logo */}
      <div className="flex items-center space-x-2 text-indigo-600">
        <PiMoneyWavyFill size={26} />
        <span className="font-bold text-lg text-gray-800">Expense Tracker</span>
      </div>

      {/* User Dropdown */}
      <div className="relative">
        <button
          className="text-gray-600 hover:text-indigo-600"
          onClick={() => setOpen(!open)}
        >
          <FaRegUserCircle size={26} />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-44 rounded-lg bg-white shadow-lg border border-gray-100">
            <div className="py-1">
              <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                {user.name}
              </button>
              <button
                type="button"
                className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                onClick={() => logout()}
              >
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
