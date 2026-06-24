import dotenv from "dotenv";
dotenv.config();

import { tavily as Tavily } from "@tavily/core";

const tavily = Tavily({
    apiKey: process.env.TAVILY_API_KEY,
});

export async function tavilySearch({ query }) {
    try {
        const result = await tavily.search(query, {
            maxResults: 5,
        });

        return JSON.stringify(result);

    } catch (err) {
        console.error("Tavily Error:", err);

        return JSON.stringify(result)
    }
}