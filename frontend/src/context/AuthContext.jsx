import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  // Check if user is logged in
  const checkUserLoggedIn = async () => {
    try {
      const { data } = await axios.get("/api/users/profile");
      setUser(data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      setError(null);
      const { data } = await axios.post("/api/users/auth", { email, password });
      setUser(data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    }
  };

  // Register
  const register = async (username, email, password) => {
    try {
      setError(null);
      const { data } = await axios.post("/api/users/register", {
        username,
        email,
        password,
      });
      setUser(data);
      return data;
    } catch (err) {
      // Format validation errors if array
      if (err.response?.data?.errors) {
        const errorMsg = err.response.data.errors.map((e) => e.msg).join(", ");
        setError(errorMsg);
      } else {
        setError(err.response?.data?.message || "Registration failed");
      }
      throw err;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await axios.post("/api/users/logout");
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
