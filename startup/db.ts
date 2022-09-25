import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

function db() {
  const db = String(config.get("db"));

  mongoose.connect(db).then(() => logger.info(`Connected to ${db}...`));
}

export default db;
