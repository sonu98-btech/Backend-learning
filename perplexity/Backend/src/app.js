import express from "express"
import AuthRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"

const app = express()


app.use(express.json())
app.use(cookieParser())


//routes prefix
app.use("/api/auth",AuthRouter)

export default app