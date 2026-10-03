import "dotenv/config"
import { ChatGoogle } from "@langchain/google";
import { ChatCohere } from "@langchain/cohere";
import { ChatGroq } from "@langchain/groq";
import { configs } from "../config/config.js";

export const cohereModel = new ChatCohere({
    model: "command-a-plus-05-2026",
    maxRetries: 2,
    apiKey: configs.COHERE_API_KEY
})

export const geminiModel = new ChatGoogle({
    model: "gemini-3.6-flash",
    maxRetries: 2,
    apiKey: configs.GOOGLE_API_KEY
});

export const groqModel = new ChatGroq({
    model: "openai/gpt-oss-120b",
    maxRetries: 2,
    apiKey: configs.GROQ_API_KEY
});

export async function aiAsk(PROMPT: string){
   const res = await groqModel.invoke(PROMPT);
   console.log(res.text)
}


