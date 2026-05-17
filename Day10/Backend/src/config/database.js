const mongoose = require("mongoose");
require("dotenv").config();
const dns = require("dns");
dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
])
function connectToDatabase() {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connect to DB");
        
    })
}
module.exports = connectToDatabase;