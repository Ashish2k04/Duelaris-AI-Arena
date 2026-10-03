import { StateSchema, MessagesValue, StateGraph, START, END } from "@langchain/langgraph";

type AIBATTELSTATE = {
    messages: typeof MessagesValue;
    solution_1: string;
    solution_2: string;
    judgement: ;
}