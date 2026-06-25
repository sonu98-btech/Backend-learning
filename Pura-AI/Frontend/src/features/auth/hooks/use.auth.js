import { login, register, getMe, logout } from "../services/auth.api";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading, setError } from "../auth.slice";
import { setCurrentChatId, setMessages } from "../../chat/chat.slice";

export const useAuth = () => {
  const dispatch = useDispatch();
  async function handleRegister(username, email, password) {
    try {
      dispatch(setLoading(true));
      const data = await register(username, email, password);
    } catch (err) {
      dispatch(setError(err.response.data.message || "Registration failed"));
    } finally {
      dispatch(setLoading(false));
    }
  }
  async function handleLogin(email, password) {
    try {
      dispatch(setLoading(true));
      const data = await login(email, password);
      dispatch(setUser(data.user));
    } catch (err) {
      dispatch(setError(err.response.data.message || "Login failed"));
    } finally {
      dispatch(setLoading(false));
    }
  }
  async function fetchCurrentUser() {
    try {
      dispatch(setLoading(true));
      const data = await getMe();

      dispatch(setUser(data.user));
    } catch (err) {
      dispatch(setError(err.response.data.message || "Failed to fetch user"));
    } finally {
      dispatch(setLoading(false));
    }
  }
  async function handleLogout() {
    try {
      dispatch(setLoading(true));
      const data = await logout();
      dispatch(setUser(null));
      dispatch(setCurrentChatId(null))
      dispatch(setMessages([]))
    } catch (err) {
      dispatch(setError(err.response.data.message || "Failed to fetch user"));
    } finally {
      dispatch(setLoading(false));
    }
  }
  return {
    handleRegister,
    handleLogin,
    fetchCurrentUser,
    handleLogout,
  };
};
