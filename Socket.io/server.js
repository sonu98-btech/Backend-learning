import app from "./src/app.js"
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    console.log("new user connected")
    socket.on("message",(msg)=>{
        console.log("user fired a message",msg)
        io.emit("abc",msg)
    })
});

httpServer.listen(3000,()=>{
    console.log("server is running port 3000");
    
});