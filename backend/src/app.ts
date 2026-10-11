import express from 'express';
import useGraph from './services/graph.ai.service.js';
import cors from "cors";

const app = express();
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credential: true,
}))

app.get('/', (req,res)=>{
    res.status(200).json({status: "ok"})
})

app.post("/invoke", async (req,res)=>{
    const {input} = req.body;
    const result = await useGraph(input)

    return res.status(200).json({
        message: "Graph executed successfully.",
        status: true,
        data: result
    })
})

export default app;