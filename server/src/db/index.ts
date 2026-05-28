import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const MONGO_URI = process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : process.env.MONGO_LOCAL_URI;
        const dbResponse = await mongoose.connect(MONGO_URI!);
        console.log(`Connected to MongoDB: ${dbResponse.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}