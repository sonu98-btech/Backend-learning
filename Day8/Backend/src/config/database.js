const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const dns = require("dns");;
dns.setServers([
    "1.1.1.1",
    "8.8.8.8"
])
function connectToDatabase() {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((err)=>{
        console.log("Error connecting to MongoDB:", err);
    })
}
module.exports = connectToDatabase;