import { initializeSocketConnection } from "../service/chat.socket";
import {
  getChats,
  getAllMessages,
  sendMessage,
  sendMessageStream,
  deleteChat,
} from "../service/chatapi";

import {
  setChats,
  setCurrentChatId,
  setLoading,
  setError,
  setMessages,
  addMessage,
  addChat,
  setIsGenerating,
  updateLastAIMessage,
} from "../chat.slice.js";

import { useDispatch, useSelector } from "react-redux";

export const usechat = () => {
  const dispatch = useDispatch();

  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const chats = useSelector(state => state.chat.chats);

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

  // async function handleSendMessage(message) {
  //   try {
  //     dispatch(setLoading(true));
  //           dispatch(
  //               addMessage({
  //                   _id: `temp-${Date.now()}`,
  //                   role: "user",
  //                   content: message,
  //               })
  //           );
  //     dispatch(setIsGenerating(true))
  //     const data = await sendMessage({
  //       message,
  //       chatId: currentChatId,
  //     });
  //     dispatch(setIsGenerating(false))
  //     console.log(data);
  //     if(data.chat){
  //       dispatch(addChat(data.chat))
  //       dispatch(setCurrentChatId(data.chat._id))
  //     }
  //     dispatch(addMessage(data.aiMessage));
  //   } catch (err) {
  //     dispatch(setError(err.response?.data?.message || err.message));
  //   } finally {
  //     dispatch(setLoading(false));
  //   }
  // }

  // delete chat
  async function handleDeleteChat(chatId) {
    try {
      await deleteChat(chatId);

      dispatch(setChats(chats.filter((chat) => chat._id !== chatId)));

      if (currentChatId === chatId) {
        dispatch(setCurrentChatId(null));
        dispatch(setMessages([]));
      }
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message));
    }
  }

  // handlesend message

  async function handleSendMessage(message) {
    dispatch(setLoading(true));
    dispatch(setIsGenerating(true));

    dispatch(
      addMessage({
        _id: `user-${Date.now()}`,
        role: "user",
        content: message,
      }),
    );

    dispatch(
      addMessage({
        _id: `ai-${Date.now()}`,
        role: "ai",
        content: "",
      }),
    );

    await sendMessageStream({
      message,

      chatId: currentChatId,

       onMeta(data) {

  console.log("Meta received:", data);

  if (!currentChatId) {
    console.log("Adding chat:", {
      _id: data.chatId,
      title: data.title,
      createdAt: data.createdAt,
    });

    dispatch(
      addChat({
        _id: data.chatId,
        title: data.title,
        createdAt: data.createdAt,
      }),
    );

    dispatch(setCurrentChatId(data.chatId));
  }
},
      onChunk(chunk) {
        dispatch(updateLastAIMessage(chunk));
      },

      onDone() {
        dispatch(setIsGenerating(false));
      },
    });

    dispatch(setLoading(false));
  }

  return {
    initializeSocketConnection,
    handleGetChats,
    handleGetMessages,
    handleSendMessage,
    handleDeleteChat,
  };
};
