const mongoose = require("mongoose");
const likeModel = require("./model/like.model");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(async () => {
    console.log("Connected to MongoDB");

    // Delete null records
    const result = await likeModel.deleteMany({
      $or: [{ post: null }, { user: null }],
    });
    console.log("Deleted", result.deletedCount, "null records");

    // Drop the old index and recreate
    try {
      await likeModel.collection.dropIndex("postId_1_userId_1");
      console.log("Dropped old postId_1_userId_1 index");
    } catch (e) {
      console.log("Old index not found:", e.message);
    }

    // Recreate indexes
    await likeModel.collection.dropIndexes();
    await likeModel.syncIndexes();
    console.log("Indexes synced");

    process.exit(0);
  })
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
