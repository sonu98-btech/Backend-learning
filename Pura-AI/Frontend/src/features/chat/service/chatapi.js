import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});


export async function sendMessage({message,chatId}){
    const response = await api.post("/api/chats/message",{message,chat:chatId})
    return response.data
}

export async function getChats(){
    const response = await api.get("/api/chats/")
    return response.data
}

export async function getAllMessages(chatId){
    const response = await api.get(`/api/chats/message/${chatId}`)
    return response.data
}
export async function deleteChat(chatId){
    const response = await api.delete(`/api/chats/${chatId}`)
    return response.data
}

export async function sendMessageStream({
  message,
  chatId,
  onMeta,
  onChunk,
  onDone,
}) {
  const response = await fetch(
    "http://localhost:3000/api/chats/message-stream",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        chat: chatId,
      }),
    }
  );

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const events = buffer.split("\n\n");

    buffer = events.pop();

    for (const event of events) {
      if (!event.startsWith("data: ")) continue;

      const data = JSON.parse(event.replace("data: ", ""));

      if (data.type === "meta") {
        onMeta(data);
      }

      if (data.type === "token") {
        onChunk(data.token);
      }

      if (data.type === "done") {
        onDone();
      }
    }
  }
}