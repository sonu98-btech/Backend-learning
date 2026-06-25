import express from "express"
import AuthRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import morgan from "morgan"
import chatRouter from "./routes/chat.routes.js"

const app = express()


app.use(express.json())
const allowedOrigins = [
  "http://localhost:5173",
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


//routes prefix
app.use("/api/auth",AuthRouter)
app.use("/api/chats",chatRouter)

export default app