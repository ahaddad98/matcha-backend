import { createLogger, format, transports, Logger } from "winston";
import jsonStringify from "fast-safe-stringify";
const { combine, timestamp, printf, errors, json } = format;

const logLikeFormat = {
  transform(info) {
    const { timestamp, label, message } = info;
    const level = info[Symbol.for("level")];
    const args = info[Symbol.for("splat")];
    const strArgs = args.map(jsonStringify).join(" ");
    info[
      Symbol.for("message")
    ] = `${timestamp} [${label}] ${level}: ${message} ${strArgs}`;
    return info;
  },
};

// Create a logger instance
const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  //format: combine(errors({ stack: true }),timestamp(), json()),
  format: format.combine(
    errors({ stack: true }),
    format.timestamp(),
    json(),
    format.label({ label: "matcha-api" }),
    logLikeFormat
  ),
  transports: [new transports.Console()],
});

export default logger;
