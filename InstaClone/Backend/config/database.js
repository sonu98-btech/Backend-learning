const mongoose = require("mongoose");
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    // Sync all indexes to match schema definitions
    await mongoose.syncIndexes();
    console.log("Indexes synced");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
module.exports = connectToDatabase;
