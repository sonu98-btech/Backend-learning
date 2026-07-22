import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/api", (req, res) => {
  res.status(200).json({ message: "Hello from the API!" });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

