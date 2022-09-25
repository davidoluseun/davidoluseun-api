import express from "express";
import "express-async-errors";
import db from "./startup/db";
import routes from "./startup/routes";
import config from "./startup/config";
import logger, { logging } from "./startup/logger";

const app = express();

db();
config();
logging();
routes(app);

const port = process.env.PORT || 3900;
const server = app.listen(port, () =>
  logger.info(`Listening on port ${port}...`)
);

export default server;
