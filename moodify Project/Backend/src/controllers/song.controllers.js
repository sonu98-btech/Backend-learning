const songModel = require("../models/song.model");
const storageService = require("../services/storage.services");
const id3 = require("node-id3");

async function uploadSong(req, res) {
  // support either single `req.file` (single upload) or `req.files` (upload.any())
  const uploadedFile =
    (req.file && req.file) || (Array.isArray(req.files) && req.files[0]);

  if (!uploadedFile || !uploadedFile.buffer) {
    return res.status(400).json({ message: "No song file provided" });
  }

  const songBuffer = uploadedFile.buffer;
  const { mood } = req.body;

  const tags = id3.read(songBuffer) || {};

  // upload song file first
  const songFile = await storageService.uploadFile({
    buffer: songBuffer,
    filename: (tags.title || "untitled") + ".mp3",
    folder: "/cohort-2/moodify/songs",
  });

  // upload poster only if image data exists in ID3 tags
  // otherwise use a public placeholder so the DB requirement is satisfied
  const DEFAULT_POSTER = "https://via.placeholder.com/500x500?text=No+Cover";
  let posterFile = { url: DEFAULT_POSTER };
  if (tags.image && tags.image.imageBuffer) {
    posterFile = await storageService.uploadFile({
      buffer: tags.image.imageBuffer,
      filename: (tags.title || "untitled") + ".jpeg",
      folder: "/cohort-2/moodify/posters",
    });
  }

  const song = await songModel.create({
    title: tags.title || "Untitled",
    AudioUrl: songFile.url,
    PosterUrl: posterFile.url || "",
    mood,
  });

  res.status(201).json({ message: "song created successfully", song });
}

async function getSong(req, res) {
  const { mood } = req.query;

  if (!mood) {
    return res
      .status(400)
      .json({ message: "Mood query parameter is required." });
  }

  const [song] = await songModel.aggregate([
    { $match: { mood } },
    { $sample: { size: 1 } },
  ]);

  if (!song) {
    return res.status(404).json({ message: "No song found for this mood." });
  }

  res.status(200).json({
    message: "song fetched successfully.",
    song,
  });
}

module.exports = { uploadSong, getSong };
