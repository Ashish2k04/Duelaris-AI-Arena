import express from 'express';
import useGraph from './services/graph.ai.service.js';

const app = express();

app.get('/health', (req,res)=>{
    res.status(200).json({status: "ok"})
})

app.post("/test-graph", async (req,res)=>{
    const result = await useGraph("Capital of india is ? and how many states are in india?")

    res.json(result)
})

export default app;