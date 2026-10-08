import { StateGraph, StateSchema, START, END, type GraphNode} from "@langchain/langgraph"
import z from "zod";
import { groqModel_1, cohereModel, groqModel_2 } from "./models.service.js";
import { createAgent, HumanMessage, providerStrategy } from "langchain";

const state = new StateSchema({
    problem: z.string().default(""),
    solution_1: z.string().default(""),
    solution_2: z.string().default(""),
    judge: z.object({
        solution_1_score: z.number().default(0),
        solution_2_score: z.number().default(0),
        solution_1_reasoning: z.string().default(""),
        solution_2_reasoning: z.string().default(""),
    })
})
