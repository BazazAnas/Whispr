import mongoose from "mongoose"
import env from "dotenv"

export  const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connect to Database :" , conn.connection.host);
    } catch (error) {
        process.error("error connecting DB" , error)
        process.exit(1);
    }
} 