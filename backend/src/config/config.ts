import "dotenv/config";

type Config = {
   readonly COHERE_API_KEY: string,
   readonly GROQ_API_KEY: string,
   readonly GEMINI_API_KEY: string
};

export const configs: Config = {
    COHERE_API_KEY: process.env.COHERE_API_KEY || "",
    GROQ_API_KEY: process.env.GROQ_API_KEY || "",
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || ""
}