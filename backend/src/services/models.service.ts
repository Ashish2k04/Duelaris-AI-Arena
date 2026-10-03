import "dotenv/config"
import { ChatGoogle } from "@langchain/google";
import { ChatCohere } from "@langchain/cohere";
import { ChatGroq } from "@langchain/groq";
import { configs } from "../config/config.js";

const COHERE = new ChatCohere({
    model: "north-small-translate-09-2026",
    temperature: 0,
    maxRetries: 2,
    apiKey: configs.COHERE_API_KEY
})

const GEMINI = new ChatGoogle({
    model: "gemini-3.5-flash",
    temperature: 0,
    maxRetries: 2,
    apiKey: configs.GOOGLE_API_KEY
});

const GROQ = new ChatGroq({
    model: "openai/gpt-oss-120b",
    temperature: 0,
    maxRetries: 2,
    apiKey: configs.GROQ_API_KEY
});

export async function aiAsk(PROMPT: string){
   const res = await GROQ.invoke(PROMPT);
   console.log(res.text)
}


