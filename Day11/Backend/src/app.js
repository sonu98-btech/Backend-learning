const express = require('express');
const app = express();
const authRouter = require('./routes/auth.router');
app.use('/api/auth', authRouter);
module.exports = app;