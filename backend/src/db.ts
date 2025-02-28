import mongoose from "mongoose";
// import dotenv from "dotenv";
import * as dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("❌ Database Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;

