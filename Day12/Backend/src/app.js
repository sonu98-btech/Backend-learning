const express = require('express');
const app = express();
app.use(express.json());
const noteModel = require('./model/model.notes');

const authRouter = require('./routes/authRouter');

// prefix
app.use("/api/auth",authRouter);
module.exports = app;