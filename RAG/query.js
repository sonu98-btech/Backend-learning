import dotenv from "dotenv"
dotenv.config()
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { Pinecone } from '@pinecone-database/pinecone'
import {embeddings,index} from "./main.js"

const queryEmbedding = await embeddings.embedQuery("how was the internship experience?");




console.log(queryEmbedding)

const result = await index.query({
    vector: queryEmbedding,
    topK: 2,
    includeMetadata: true
})


console.log(JSON.stringify(result))