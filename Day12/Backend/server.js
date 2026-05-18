
const dotenv = require('dotenv');
const app = require('./src/app');
const connectDB = require('./src/config/database');
dotenv.config();

connectDB();
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});