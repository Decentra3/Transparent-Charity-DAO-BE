import http from "http";
import config from "../config.js";
import logger from "./utils/logger.js";

import app from "./app.js";
import { initSocket } from "./socket.js";
import { initBlockchainService } from "./services/blockchain/blockchainService.js";
import connectDB from "./config/db.js";

const startServer = async () => {
  try {
    // Kết nối MongoDB
    await connectDB();

    const server = http.createServer(app);
    const io = initSocket(server);

    initBlockchainService(io);

    server.listen(config.server.port, () => {
      logger.info(`Server running on port ${config.server.port}`);
    });
  } catch (err) {
    logger.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
