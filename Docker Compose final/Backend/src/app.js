import express from "express";
import morgan from "morgan";
const app = express();

// Middleware

app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("Hello, World!");
});
app.get("/users",(req,res)=>{
    const users = [
        { id: 1, name: "John Doe" }
    ];
    res.status(200).json({
        status: "success",
        data: users
    });
})

export default app;