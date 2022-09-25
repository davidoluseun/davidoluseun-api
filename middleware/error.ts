import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import logger from "../startup/logger";

function error(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(err);

  res.status(500).send("Something failed.");
}

export default error;
