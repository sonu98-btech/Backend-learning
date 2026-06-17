import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: "AIzaSyCtrUPgwQUk-WqpKG6bKK1OT_2C8U8X-Cc"
});

export default model;

