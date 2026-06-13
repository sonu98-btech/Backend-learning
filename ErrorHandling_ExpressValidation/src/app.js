import express from "express"
import AuthRouter from "./routes/app.routes.js"
import handleError from "./middlewares/error.middleware.js"
 const app = express()


 app.use(express.json())
 app.use("/api/auth",AuthRouter,)

 app.use(handleError)
 export default app