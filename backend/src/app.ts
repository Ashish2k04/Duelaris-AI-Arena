import "dotenv/config";
import express from 'express';
import useGraph from './services/graph.ai.service.js';
import { sendingRequestLimiter } from "./middleware/rateLimit.middleware.js";
import cors from "cors";

const app = express();
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true
}))

app.get('/', (req,res)=>{
    res.status(200).json({status: "ok"})
})

app.post("/invoke", sendingRequestLimiter, async (req,res)=>{
    const {input} = req.body;
    const result = await useGraph(input)

    return res.status(200).json({
        message: "Graph executed successfully.",
        status: true,
        data: result
    })
})

export default app;