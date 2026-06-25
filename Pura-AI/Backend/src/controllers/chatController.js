import {
  generateResponse,
  generateTitle,
  generateResponseStream,
} from "../services/ai.services.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.mode.js";
export const sendMessage = async (req, res) => {
  const user = req.user.id;
  const { message, chat: chatId } = req.body;
  const isValidchat = await chatModel.findOne({
    user: user,
    _id: chatId,
  });
  if (chatId) {
    if (!isValidchat) {
      return res.status(404).json({
        message: "No chat found With this user",
      });
    }
  }

  let title, chat;
  if (!chatId) {
    title = await generateTitle(message);
    chat = await chatModel.create({
      user: user,
      title: title,
    });
  }
  const userMessage = await messageModel.create({
    chat: chatId || chat._id,
    content: message,
    role: "user",
  });

  const messages = await messageModel.find({ chat: chatId || chat._id });

  const result = await generateResponse(messages);
  const aiMessage = await messageModel.create({
    chat: chatId || chat._id,
    content: result,
    role: "ai",
  });

  res.status(201).json({
    title,
    chat,
    userMessage,
    aiMessage,
  });
};

export const getChats = async (req, res) => {
  const user = req.user.id;
  const chats = await chatModel.find({ user: req.user.id });
  return res.status(201).json({
    message: "Chats fetched Successfully",
    chats,
  });
};

export async function getAllMessages(req, res) {
  const { chatId } = req.params;

  const chat = await chatModel.findOne({
    _id: chatId,
    user: req.user.id,
  });

  if (!chat) {
    return res.status(404).json({
      message: "Chat not found",
    });
  }

  const messages = await messageModel.find({
    chat: chatId,
  });

  res.status(200).json({
    message: "Messages retrieved successfully",
    messages,
  });
}

export const deleteChat = async (req, res) => {
  const { chatId } = req.params;
  const chat = await chatModel.findOneAndDelete({
    user: req.user.id,
    _id: chatId,
  });
  if (!chat) {
    return res.status(404).json({
      message: "chat not found",
    });
  }
  await messageModel.deleteMany({ chat: chatId });
  return res.status(201).json({
    message: "chat deleted successfully",
    chat,
  });
};

// Streaming

export const sendMessageStream = async (req, res) => {
  const user = req.user.id;

  const { message, chat: chatId } = req.body;

  const isValidchat = await chatModel.findOne({
    user: user,
    _id: chatId,
  });

  if (chatId) {
    if (!isValidchat) {
      return res.status(404).json({
        message: "No chat found With this user",
      });
    }
  }

  let title, chat;

  if (!chatId) {
    title = await generateTitle(message);

    chat = await chatModel.create({
      user,
      title,
    });
  }
  const currentChat = chat || isValidchat;
  const userMessage = await messageModel.create({
    chat: currentChat._id,
    content: message,
    role: "user",
  });

const messages = await messageModel.find({
  chat: currentChat._id,
});
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.flushHeaders();

  // Send metadata first
  res.write(
  `data: ${JSON.stringify({
    type: "meta",
    chatId: currentChat._id,
    title: currentChat.title,
    createdAt: currentChat.createdAt,
  })}\n\n`,
);
  const stream = await generateResponseStream(messages);

  let fullResponse = "";
  for await (const chunk of stream) {
    const token = chunk.content;

    if (!token) continue;

    fullResponse += token;

    res.write(
      `data: ${JSON.stringify({
        type: "token",
        token,
      })}\n\n`,
    );
  }
 await messageModel.create({
  chat: currentChat._id,
  content: fullResponse,
  role: "ai",
});

  res.write(
    `data: ${JSON.stringify({
      type: "done",
    })}\n\n`,
  );

  res.end();
};
