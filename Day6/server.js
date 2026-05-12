require("dotenv").config()
const app = require("./src/app")
const connectToMongoDB = require("./src/config/database") 
connectToMongoDB()

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})