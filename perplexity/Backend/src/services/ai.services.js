import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage ,AIMessage, tool,createAgent} from "langchain";
import { SystemMessage } from "langchain";
import { tavilySearch } from "./tavily.service.js";
import * as z from "zod";
import dotenv from "dotenv";
dotenv.config();

// model
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model: "mistral-medium-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

//tool

const searchInternetTool = tool(
    tavilySearch,
    {
        name: "searchInternet",
        description: "Use this tool to get the latest information from the internet.",
        schema: z.object({
            query: z.string().describe("The search query to look up on the internet.")
        })
    }
)

//agent
const agent = createAgent({
  model:mistralModel,
  tools:[searchInternetTool]
})

//generate response
export const generateResponse = async (messages) => {
  const response = await agent.invoke({
    messages : [
      new SystemMessage(`
                You are a helpful and precise assistant for answering questions.
                If you don't know the answer, say you don't know. 
                If the question requires up-to-date information, use the "searchInternet" tool to get the latest information from the internet and then answer based on the search results.
            `),
    ...(messages.map(msg=>{
    if(msg.role=="user"){
      return new HumanMessage(msg.content)
    }
    if(msg.role=="ai"){
      return new AIMessage(msg.content)
    }
  }))
    ]
  })
  return response.messages[ response.messages.length - 1 ].text;
};


export const generateTitle = async (message) => {
  const response = await mistralModel.invoke([
    new SystemMessage(`
            You are a helpful assistant that generates concise and descriptive titles for chat conversations.
            User will provide you with the first message of a chat conversation, and you will generate a title that captures the essence of the conversation in 2-4 words. The title should be clear, relevant, and engaging, giving users a quick understanding of the chat's topic.    
        `),
    new HumanMessage(`Generate a title for a chat conversation based on the following first message:
            "${message}"
            `),
  ]);
  return response.text;
};


export default model;
