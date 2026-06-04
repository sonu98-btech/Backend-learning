const dotenv = require('dotenv');
dotenv.config();
const connectToDatabase = require('./config/database');
const app = require('./app');

connectToDatabase();
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});