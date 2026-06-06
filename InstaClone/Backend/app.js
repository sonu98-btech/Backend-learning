const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

//Importing Routes
const followRouter = require("./routes/follow.routes");
const postRouter = require("./routes/post.routes");
const likeRouter = require("./routes/like.routes");
const authRouter = require("./routes/auth.routes");
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/posts", likeRouter);
app.use("/api", followRouter);
module.exports = app;
