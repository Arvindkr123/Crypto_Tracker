import mongoose from "mongoose";
import dotenvData from "../config/config.js";

const connectToDBHandler = async () => {
    try {
        const conn = await mongoose.connect(dotenvData.MONGOURI)
        console.log("database connection established", conn.connection.host)
    } catch (error) {
        console.log("error while connecting to DB", error)
    }
}

export default connectToDBHandler