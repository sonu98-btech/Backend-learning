import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import model from "./src/services/ai.services.js";
import http from "http"
import { initSocket } from "./src/sockets/server.socket.js";
import app from "./src/app.js";
import connectToDb from "./src/config/database.js";

connectToDb();

const httpServer = http.createServer(app)
initSocket(httpServer)
httpServer.listen(3000, () => {
  console.log("server is running on port 3000");
});
