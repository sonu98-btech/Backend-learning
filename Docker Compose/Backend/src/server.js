import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/api", (req, res) => {
  res.send("API is working!");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
})   