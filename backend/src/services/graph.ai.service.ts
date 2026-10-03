import { StateSchema, MessagesValue, StateGraph, START, END } from "@langchain/langgraph";

type JUDGEMENT = {
    winner: "solution_1" | "solution_2";
    solution_1_score: number;
    solution_2_score: number;
}

type AIBATTELSTATE = {
    messages: typeof MessagesValue;
    solution_1: string;
    solution_2: string;
    judgement: ;
}