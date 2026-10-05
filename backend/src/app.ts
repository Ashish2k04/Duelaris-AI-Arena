import express from 'express';
import useGraph from './services/graph.ai.service.js';

const app = express();

app.get('/health', (req,res)=>{
    res.status(200).json({status: "ok"})
})

app.post("/test-graph", async (req,res)=>{
    await useGraph("What is event loop in javascript?")
})

export default app;