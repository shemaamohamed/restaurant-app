import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
        console.log('DB is connected');
    } catch (error) {
        console.error('DB connection failed:', error.message);
        process.exit(1);
    }
};
