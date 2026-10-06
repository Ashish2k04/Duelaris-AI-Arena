import "dotenv/config";

type Config = {
   readonly COHERE_API_KEY: string,
   readonly GROQ_API_KEY_1: string,
   readonly GROQ_API_KEY_2: string
};

export const configs: Config = {
    COHERE_API_KEY: process.env.COHERE_API_KEY || "",
    GROQ_API_KEY_1: process.env.GROQ_API_KEY_2 || "",
    GROQ_API_KEY_2: process.env.GROQ_API_KEY_1 || ""
}