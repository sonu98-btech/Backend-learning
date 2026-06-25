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
const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
