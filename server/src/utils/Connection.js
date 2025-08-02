import mongoose from "mongoose";
import dotenvData from "../config/config.js";

const connectToDBHandler = async () => {
    try {
        await mongoose.connect(dotenvData.MONGOURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.log("error while connecting to DB", error)
    }
}

export default connectToDBHandler