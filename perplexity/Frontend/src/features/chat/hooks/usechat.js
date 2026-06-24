import { initializeSocketConnection } from "../service/chat.socket";
import {
  getChats,
  getAllMessages,
  sendMessage,
} from "../service/chatapi";

import {
  setChats,
  setCurrentChatId,
  setLoading,
  setError,
  setMessages,
  addMessage,
  addChat,
  setIsGenerating
} from "../chat.slice.js";

import { useDispatch, useSelector } from "react-redux";

export const usechat = () => {
  const dispatch = useDispatch();

  const currentChatId = useSelector(
    (state) => state.chat.currentChatId
  );

  // ------------------ Get Chats ------------------------

  async function handleGetChats() {
    try {
      dispatch(setLoading(true));

      const data = await getChats();

      dispatch(setChats(data.chats));
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  // ------------------ Get Messages --------------------------

  async function handleGetMessages(chatId) {
    try {
      dispatch(setLoading(true));

      dispatch(setCurrentChatId(chatId));

      const data = await getAllMessages(chatId);

      dispatch(setMessages(data.messages));
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  // ------------------ Send Message -------------------------------

  async function handleSendMessage(message) {
    try {
      dispatch(setLoading(true));
            dispatch(
                addMessage({
                    _id: `temp-${Date.now()}`,
                    role: "user",
                    content: message,
                })
            );
      dispatch(setIsGenerating(true))
      const data = await sendMessage({
        message,
        chatId: currentChatId,
      });
      dispatch(setIsGenerating(false))
      console.log(data);
      if(data.chat){
        dispatch(addChat(data.chat))
        dispatch(setCurrentChatId(data.chat._id))
      }
      dispatch(addMessage(data.aiMessage));
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  return {
    initializeSocketConnection,
    handleGetChats,
    handleGetMessages,
    handleSendMessage,
  };
};