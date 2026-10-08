import express from 'express';
import useGraph from './services/graph.ai.service.js';

const app = express();

app.get('/health', (req,res)=>{
    res.status(200).json({status: "ok"})
})

app.post("/test-graph", async (req,res)=>{
    await useGraph("Name a programming language which is good for students who're learning ai.")
})

export default app;