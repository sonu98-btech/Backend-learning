const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const connectDB =  () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.log('MongoDB connection error:', err));
}

module.exports = connectDB;