import { HumanMessage } from "@langchain/core/messages";
import { StateSchema, MessagesValue, ReducedValue, type GraphNode , StateGraph, START, END } from "@langchain/langgraph";
import {geminiModel, cohereModel, groqModel} from "./models.service.js";
import {createAgent, providerStrategy} from "langchain";
import {z} from "zod";

const State = new StateSchema({
    messages: MessagesValue,
    solution_1: new ReducedValue(z.string().default(""), {
        reducer: (current, next) => {
           return next
        }
    }),
     solution_2: new ReducedValue(z.string().default(""), {
        reducer: (current, next) => {
           return next
        }
    }),
    judge_recommendation: new ReducedValue(z.object().default({
        solution_1_score: 0,
        solution_2_score: 0,
    }), {
        reducer: (current, next) => {
            return next
        }
    })
})

const solutionNode: GraphNode<typeof State> = async (state: typeof State) => {
       const [cohere_solution, groq_solution] = await Promise.all([
        cohereModel.invoke(state.messages[0].text),
        groqModel.invoke(state.messages[0].text)
       ])

       return {
          solution_1: cohere_solution.text,
          solution_2: groq_solution.text
       }
}

const judgeNode: GraphNode<typeof State> = async (state: typeof State) => {
      const {solution_1, solution_2} = state;

      const judge = await createAgent({
        model: geminiModel,
        tools: [],
        responseFormat: providerStrategy(z.object({
            solution_1_score: z.number().min(0).max(10),
            solution_2_score: z.number().min(0).max(10)
        }))
      })

      const judgeResponse = await judge.invoke({
        messages: [
             new HumanMessage(
                `You are a judge tasked with evaluating the quality of two solutions to a problem. 
                The problem is: ${state.messages[0].text}. The first solution is: ${solution_1}. 
                The second solution is: ${solution_2}. Please provide a score between 0 and 10 for each solution, 
                where 0 means the solution is completely incorrect or irrelevant, and 10 means the solution is perfect 
                and fully addresses the problem.`
            )
        ]
      })
}

const graph = new StateGraph(State)
       .addNode("solution", solutionNode)
       .addEdge(START, "solution")
       .addEdge("solution", END)
       .compile()

export default async function (userMessage: string) {
    const result = await graph.invoke({
        messages: [
            new HumanMessage(userMessage)
        ]
    })

    console.log(result);
    
    return result.messages
}       