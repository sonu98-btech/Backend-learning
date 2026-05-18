const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);

function connectDB() {
    return mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB connected successfully'));
}

module.exports = connectDB;