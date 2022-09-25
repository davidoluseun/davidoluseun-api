import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(format.errors({ stack: true }), format.json()),
  transports: [
    new transports.File({ filename: "combine.log", level: "info" }),
    new transports.File({ filename: "exceptions.log", level: "error" }),
  ],
});

export function logging() {
  logger.exceptions.handle(
    new transports.Console(),
    new transports.File({ filename: "exceptions.log" })
  );

  logger.rejections.handle(
    new transports.Console(),
    new transports.File({ filename: "exceptions.log" })
  );

  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

export default logger;
