import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        mongoose.connection.on("connected",()=> console.log("database is connected"))
        await mongoose.connect(`${process.env.MONGODB_URL}`)
    } catch (error) {
        console.error(error.message)
    }
}

export default connectDB;