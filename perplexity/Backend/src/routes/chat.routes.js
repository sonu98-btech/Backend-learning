import {Router} from "express"
import { sendMessage,getChats,getAllMessages,deleteChat} from "../controllers/chatController.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const chatRouter =  Router()

//Routes

chatRouter.post("/message",authMiddleware,sendMessage)
chatRouter.get("/",authMiddleware,getChats)
chatRouter.get("/message/:chatId",authMiddleware,getAllMessages)
chatRouter.delete("/:chatId" ,authMiddleware,deleteChat)
export default chatRouter