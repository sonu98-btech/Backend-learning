const mongoose = require('mongoose');
require('dotenv').config();
const dns = require('dns');
dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);
const connectToDatabase = async () =>{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to Db");
    
}
module.exports = connectToDatabase;