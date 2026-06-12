import { AuthProvider } from "../auth.context";
import { getMe, login, logout, register } from "../services/auth.api";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const registerHandler = async (username, email, password) => {
    setLoading(true);
    const data = await register(username, email, password);
    setUser(data.user);
    setLoading(false);
  };

  const loginHandler = async (username, email, password) => {
    setLoading(true);
    const data = await login(username, email, password);
    setUser(data.user);
    setLoading(false);
  };

  const logoutHandler = async () => {
    setLoading(true);
    await logout();
    setUser(null);
    setLoading(false);
  };

  const getMeHandler = async () => {
    setLoading(true);
    const data = await getMe();
    setUser(data.user);
    setLoading(false);
  };

  useEffect(() => {
    getMeHandler();
  }, []);

  return {
    user,
    registerHandler,
    loginHandler,
    logoutHandler,
    getMeHandler,
    loading,
  };
};
