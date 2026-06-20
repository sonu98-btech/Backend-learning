import express from "express"
import AuthRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import morgan from "morgan"

const app = express()


app.use(express.json())
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))
app.use(morgan('dev'))
app.use(cookieParser())


//routes prefix
app.use("/api/auth",AuthRouter)

export default app