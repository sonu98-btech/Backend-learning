import express from "express"
import AuthRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import morgan from "morgan"
import chatRouter from "./routes/chat.routes.js"
import path from "path";
import { fileURLToPath } from "url";
const app = express()


app.use(express.json())
const allowedOrigins = [  ,
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(morgan('dev'))
app.use(cookieParser())


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//routes prefix
app.use("/api/auth",AuthRouter)
app.use("/api/chats",chatRouter)
app.use(express.static(path.join(__dirname, "../dist")));

app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});
export default app