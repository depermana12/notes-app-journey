import winston from "winston";
import path from "node:path";
import { log } from "node:console";

const __dirname = import.meta.dirname;
const BASE_PATH = path.resolve(__dirname, "../");

const config = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    verbose: "cyan",
    debug: "blue",
    silly: "magenta",
  },
};

winston.addColors(config.colors);

const logger = winston.createLogger({
  levels: config.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: "DD-MM-YYYY HH:mm:ss",
    }),
    winston.format.printf(({ timestamp, level, message, stack }) => {
      const errorMessage = stack ? `${message}\n${stack}` : message;
      return `${timestamp} ${level}: ${errorMessage}\n`;
    }),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(BASE_PATH, "logs", "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(BASE_PATH, "logs", "combine.log"),
      level: "warn",
    }),
  ],
});

export default logger;
