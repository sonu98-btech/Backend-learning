import dns from "dns"
import mongoose from "mongoose"
dns.setServers(["8.8.8.8","8.8.4.4"])
const connectToDb = ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(console.log(
        "connected to Db"
    ))
}
export default connectToDb