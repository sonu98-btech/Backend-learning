const express = require("express");
const SongRouter = express.Router();
const upload = require("../middlewares/song.middleware");
const songController = require("../controllers/song.controllers");

//upload Song route

// accept any file field name (client may send 'song' or 'file' etc.)
SongRouter.post("/", upload.any(), songController.uploadSong);

// get song route
SongRouter.get("/", songController.getSong);

module.exports = SongRouter;
