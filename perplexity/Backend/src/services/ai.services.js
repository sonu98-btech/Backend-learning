import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: "AIzaSyCvwEwI308T7AJa-6EOYzUDFDk79crRHvg"
});

export default model;

