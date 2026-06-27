import dotenv from "dotenv"
dotenv.config()
import { PDFParse } from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { Pinecone } from '@pinecone-database/pinecone'
import fs from 'fs'

const dataBuffer = fs.readFileSync("./story.pdf")

const parser = new PDFParse({
    data:dataBuffer
})


export const embeddings = new MistralAIEmbeddings({
    apiKey:process.env.MISTRAL_API_KEY,
    model:"mistral-embed"
})

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

export const index = pc.index("cohort-2-rag")

const data = await parser.getText()
// console.log(data)
const splitter = new RecursiveCharacterTextSplitter({
    chunkSize:500,
    chunkOverlap:0
})
const chunks = await splitter.splitText(data.text)
// console.log(chunks,chunks.length)

const docs = await Promise.all(chunks.map(async (chunk) => {
    const embedding = await embeddings.embedQuery(chunk)
    return {
        text: chunk,
        embedding
    }
}))
console.log(docs)


const result = await index.upsert({
    records: docs.map((doc, i) => ({
        id: `doc-${i}`,
        values: doc.embedding,
        metadata: {
            text: doc.text
        }
    }))
})

console.log(result)

