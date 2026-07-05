import express from "express";
import funGraph from "./ai/graph.js"
const app = express();

app.use(express.json());

app.post("/invoke", async(req, res)=>{
    const {problem} = req.body;
    const result = await funGraph(problem)
    res.status(200).json({
        "message":"Graph invoked successfully",
        "result":result
    })
    
})
export default app;