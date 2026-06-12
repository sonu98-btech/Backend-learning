const express = require("express");
require("dotenv").config();
require("./config/cache"); // Import Redis connection
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path")
// const corsOptions = {
//     origin: 'http://localhost:5173', // Frontend URL
//     credentials: true, // Allow cookies to be sent
// };
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow cookies to be sent
  }),
);
app.use(express.json());
app.use(cookieParser());

// Importing Routes
const AuthRouter = require("./routes/auth.routes");
const SongRouter = require("./routes/song.routes");
// Using Routes
app.use("/api/auth", AuthRouter);
app.use("/api/song", SongRouter);


//dist setup
app.use(express.static(path.join(__dirname, "../dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});
module.exports = app;
