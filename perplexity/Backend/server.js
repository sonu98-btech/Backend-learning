import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import model from "./src/services/ai.services.js";

import app from "./src/app.js";
import connectToDb from "./src/config/database.js";

connectToDb();

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

const response = await model.invoke("explain the meaning of hyprocrite in punjabi?");
console.log(response);