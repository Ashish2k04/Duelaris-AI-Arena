import "dotenv/config"
import { ChatGoogle } from "@langchain/google";
import { ChatCohere } from "@langchain/cohere";
import { ChatGroq } from "@langchain/groq";

const COHERE = new ChatCohere({
    model: "north-small-translate-09-2026",
    temperature: 0,
    maxRetries: 2,
    // other params...
})

const GEMINI = new ChatGoogle("gemini-3.5-flash");

const GROQ = new ChatGroq({
model: "openai/gpt-oss-120b",
temperature: 0
});

export async function aiAsk(PROMPT: string){
   const res = await GROQ.invoke(PROMPT);
   console.log(res.text)
}


