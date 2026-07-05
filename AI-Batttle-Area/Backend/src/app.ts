import express from "express";
import funGraph from "./ai/graph.js"
const app = express();

app.use(express.json());

// CORS Middleware
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
        return;
    }
    next();
});

app.post("/invoke", async(req, res)=>{
    const {problem} = req.body;
    const result = await funGraph(problem)
    res.status(200).json({
        "message":"Graph invoked successfully",
        "result":result
    })
    
})
export default app;