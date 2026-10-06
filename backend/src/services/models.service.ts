import "dotenv/config"
import { ChatCohere } from "@langchain/cohere";
import { ChatGroq } from "@langchain/groq";
import { configs } from "../config/config.js";

export const cohereModel = new ChatCohere({
    model: "command-r7b-12-2024",
    maxRetries: 2,
    apiKey: configs.COHERE_API_KEY
})

export const groqModel_1 = new ChatGroq({
    model: "openai/gpt-oss-120b",
    maxRetries: 2,
    apiKey: configs.GROQ_API_KEY_1
});

export const groqModel_2 = new ChatGroq({
    model: "openai/gpt-oss-120b",
    maxRetries: 2,
    apiKey: configs.GROQ_API_KEY_2
});


