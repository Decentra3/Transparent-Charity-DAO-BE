import mongoose from "mongoose";
import logger from "../utils/logger.js";
import config from "../../config.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongo.uri, {
      dbName: config.mongo.dbName, // ✅ chỉ định rõ ràng ở đây
    });
    logger.info(
      `MongoDB connected: ${conn.connection.host}/${config.mongo.dbName}`
    );
  } catch (err) {
    logger.error("MongoDB connection error:", err); // in full object
    process.exit(1);
  }
};

export default connectDB;
