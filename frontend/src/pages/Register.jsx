import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/axiosInstance";

import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await apiClient.post("/api/users/register", formData);
      setSuccess("Registration successful!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setError(err.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center font-sans p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Register
          </h2>

          {error && (
            <div
              className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-md text-sm"
              role="alert"
            >
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div
              className="bg-green-100 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded-md text-sm"
              role="alert"
            >
              <p>{success}</p>
            </div>
          )}

          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <Link to={"/login"}>
          <h6 className=" font-medium text-center text-blue-800 mt-4">
            Already Registered?
          </h6>
        </Link>
      </div>
    </div>
  );
}

export default Register;
