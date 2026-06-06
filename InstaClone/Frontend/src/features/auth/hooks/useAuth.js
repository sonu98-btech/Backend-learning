import { AuthContext } from "../auth.context";
import { useContext } from "react";
import { login, register, getMe } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async (username, password) => {
    setLoading(true);
    const response = await login(username, password);
    setUser(response.user);
    if (response?.user?.token) {
      try {
        localStorage.setItem("token", response.user.token);
      } catch (error) {
        console.warn("Unable to save token to localStorage", error);
      }
    }
    setLoading(false);
  };
  const handleRegister = async (username, email, password) => {
    setLoading(true);
    const response = await register(username, email, password);
    setUser(response.user);
    if (response?.user?.token) {
      try {
        localStorage.setItem("token", response.user.token);
      } catch (error) {
        console.warn("Unable to save token to localStorage", error);
      }
    }
    setLoading(false);
  };
  const getMe = async () => {
    setLoading(true);
    const response = await getMe();
    setUser(response.user);
    setLoading(false);
  };

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    getMe,
  };
};
