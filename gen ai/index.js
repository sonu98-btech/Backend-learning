import dotenv from "dotenv"
dotenv.config()
import readline from "readline/promises"
import { ChatMistralAI } from "@langchain/mistralai"
import { HumanMessage } from "@langchain/core/messages"
import { sendEmail } from "./mail.services.js"
import { tool } from "langchain"
import { createAgent } from "langchain"
import { TavilySearch } from "@langchain/tavily";
import * as z from "zod"// to determine the type of the input and output of the tool


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const model = new ChatMistralAI({
    model: "mistral-small-latest",
    // other params...
})

const tavilySearchTool = new TavilySearch({
  maxResults: 5,
  topic: "general",
})

const sendEmailTool = tool(
  async ({ to, subject, html, text }) => {
    return await sendEmail({
      to,
      subject,
      html,
      text,

    });
  },
  {
    name: "sendEmail",
    description: "Send an email using the provided details",
    schema: z.object({
      to: z.string().email(),
      subject: z.string(),
      html: z.string(),
      text: z.string().optional(),
    }),
  }
);
const agent = createAgent({
    model,
    tools: [sendEmailTool, tavilySearchTool],
})

;
const messages = [];

while (true) {
    const userInput = await rl.question("You: ");

    messages.push(new HumanMessage(userInput));

    const response = await agent.invoke({
        messages,
    });

    const aiMessage = response.messages[response.messages.length - 1];

    messages.push(aiMessage);

    console.log("MistralAI:", aiMessage.content);
}