import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Plus,
  MessageSquare,
  Search,
  Bookmark,
  Settings,
  LogOut,
  ChevronDown,
  Paperclip,
  Globe,
  Sparkles,
  Send,
  Copy,
  ThumbsUp,
  ThumbsDown,
  CheckCheck,
  ArrowDown,
} from "lucide-react";
import { usechat } from "../hooks/usechat";
import { setCurrentChatId, setMessages } from "../chat.slice";

const Dashboard = () => {
  const chats = useSelector((state) => state.chat.chats);
  const messages = useSelector((state) => state.chat.messages);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  const [input, setInput] = useState("");
  const {
    initializeSocketConnection,
    handleGetChats,
    handleGetMessages,
    handleSendMessage,
  } = usechat();

  useEffect(() => {
    initializeSocketConnection();
    handleGetChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;
    await handleSendMessage(input);
    setInput("");
  }

  function handleNewChat() {
    dispatch(setCurrentChatId(null));
    dispatch(setMessages([]));
  }

  const reversedChats = [...chats].reverse();
  const activeChat = chats.find((c) => c._id === currentChatId);
  const activeTitle = activeChat?.title || "New Chat";

  const formatTime = (date) =>
    new Date(date || Date.now()).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="h-screen w-screen bg-[#0a0a0f] text-white flex overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-[280px] shrink-0 bg-[#0d0d14] border-r border-white/5 flex flex-col">
        {/* Brand */}
        <div className="px-6 pt-6 pb-5 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500/30 to-purple-600/20 border border-indigo-400/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-indigo-300" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-wide">PURA AI</h1>
            <p className="text-xs text-zinc-500">Research Assistant</p>
          </div>
        </div>

        {/* New Chat */}
        <div className="px-4">
          <button
            onClick={handleNewChat}
            className="w-full h-11 rounded-xl bg-indigo-500 hover:bg-indigo-400 transition-colors flex items-center justify-center gap-2 font-medium text-sm shadow-lg shadow-indigo-500/20"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </button>
        </div>

        {/* Recent Chats */}
        <div className="px-4 mt-6 mb-2 text-xs uppercase tracking-wider text-zinc-500">
          Recent Chats
        </div>
        <div className="flex-1 overflow-y-auto px-3 space-y-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {reversedChats.map((chat) => {
            const active = chat._id === currentChatId;
            return (
              <button
                key={chat._id}
                onClick={() => handleGetMessages(chat._id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors group ${
                  active
                    ? "bg-indigo-500/10 border-l-2 border-indigo-400"
                    : "hover:bg-white/5 border-l-2 border-transparent"
                }`}
              >
                <MessageSquare
                  className={`w-4 h-4 shrink-0 ${
                    active ? "text-indigo-300" : "text-zinc-500"
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">
                    {chat.title}
                  </div>
                  <div className="text-xs text-zinc-500 truncate">
                    {chat.subtitle || "Today"}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-white/5 px-3 py-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm text-zinc-300">
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm text-zinc-300">
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 px-8 flex items-center justify-between border-b border-white/5">
          <button className="flex items-center gap-2 text-base font-medium hover:text-indigo-300 transition-colors">
            {activeTitle}
            <ChevronDown className="w-4 h-4 text-zinc-500" />
          </button>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-lg hover:bg-white/5 flex items-center justify-center text-zinc-400">
              <Search className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-lg hover:bg-white/5 flex items-center justify-center text-zinc-400">
              <Bookmark className="w-4 h-4" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 ml-2" />
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-8 py-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="max-w-3xl mx-auto space-y-8">
            {messages.map((message) => {
              const isUser = message.role === "user";
              return isUser ? (
                <div key={message._id} className="flex justify-end">
                  <div className="max-w-[75%] bg-[#1a1a2e] border border-white/5 rounded-2xl rounded-br-sm px-5 py-3">
                    <p className="text-[15px] whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                    <div className="flex items-center justify-end gap-1.5 mt-2 text-xs text-zinc-500">
                      {formatTime(message.createdAt)}
                      <CheckCheck className="w-3.5 h-3.5 text-indigo-400" />
                    </div>
                  </div>
                </div>
              ) : (
                <div key={message._id} className="flex gap-3">
                  <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-600/20 border border-indigo-400/30 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-indigo-300" />
                  </div>
                  <div className="flex-1 max-w-[85%]">
                    <div className="bg-[#13131c] border border-white/5 rounded-2xl rounded-tl-sm px-5 py-4">
                      <p className="text-[15px] whitespace-pre-wrap leading-relaxed text-zinc-100">
                        {message.content}
                      </p>
                      <div className="flex items-center justify-between mt-3 pt-1">
                        <span className="text-xs text-zinc-500">
                          {formatTime(message.createdAt)}
                        </span>
                        <div className="flex items-center gap-1 text-zinc-500">
                          <button className="p-1.5 hover:bg-white/5 hover:text-zinc-200 rounded-md transition-colors">
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 hover:bg-white/5 hover:text-zinc-200 rounded-md transition-colors">
                            <ThumbsUp className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 hover:bg-white/5 hover:text-zinc-200 rounded-md transition-colors">
                            <ThumbsDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Composer */}
        <div className="px-8 pb-6 pt-2">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-3">
              <button className="hidden items-center gap-1.5 px-3 py-1.5 bg-indigo-500/15 border border-indigo-400/30 rounded-full text-xs text-indigo-300 hover:bg-indigo-500/25 transition-colors">
                <ArrowDown className="w-3 h-3" />
                New messages
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-[#13131c] border border-indigo-500/40 rounded-2xl px-5 pt-4 pb-3 focus-within:border-indigo-400 transition-colors"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="w-full bg-transparent outline-none text-[15px] placeholder:text-zinc-500 mb-3"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-zinc-500">
                  <button
                    type="button"
                    className="p-2 hover:bg-white/5 hover:text-zinc-200 rounded-lg transition-colors"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="p-2 hover:bg-white/5 hover:text-zinc-200 rounded-lg transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="p-2 hover:bg-white/5 hover:text-zinc-200 rounded-lg transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-10 h-10 rounded-xl bg-indigo-500 hover:bg-indigo-400 transition-colors flex items-center justify-center shadow-lg shadow-indigo-500/20 disabled:opacity-50"
                  disabled={!input.trim()}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>

            <p className="text-center text-xs text-zinc-500 mt-3">
              PURA AI can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
