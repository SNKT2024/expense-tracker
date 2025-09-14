import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/login`,
        { email, password }
      );

      setToken(data.token);
      setUser(data.user);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Invalid credentials",
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const isAuthenticated = () => !!token;

  const value = { user, token, login, logout, isAuthenticated, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
