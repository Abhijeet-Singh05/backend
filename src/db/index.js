import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(`${process.env.MONOGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB connected: ${connect.connection.host}`);
    }
    catch(err){
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    }
}

export default connectDB;