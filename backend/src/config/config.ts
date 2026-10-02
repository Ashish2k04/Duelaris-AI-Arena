import {config} from 'dotenv';
config();

type Config = {
   readonly GOOGLE_API_KEY: string,
   readonly COHERE_API_KEY: string,
   readonly GROQ_API_KEY: string
};

export const configs: Config = {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
    COHERE_API_KEY: process.env.COHERE_API_KEY || "",
    GROQ_API_KEY: process.env.GROQ_API_KEY || ""
}