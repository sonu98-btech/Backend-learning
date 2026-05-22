const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');



const authRouter = require('./routes/auth.router');
const postRouter = require('./routes/post.router');
const followRouter = require('./routes/follow.router');
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(cookieParser());
//router prefix
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.use('/api', followRouter);

module.exports = app;