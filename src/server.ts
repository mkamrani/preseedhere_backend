import bodyParser from "body-parser";
import express from "express";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import cors from "cors";
import routes from "./routes";

function createServer(): express.Application {
  const app = express();

  // use body parser middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // here we are adding middleware to allow cross-origin requests
  app.use(cors());

  // here we are preparing the expressWinston logging middleware configuration,
  // which will automatically log all HTTP requests handled by Express.js
  const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.json(),
      winston.format.prettyPrint(),
      winston.format.colorize({ all: true })
    ),
  };

  if (!process.env.DEBUG) {
    loggerOptions.meta = false; // when not debugging, log requests as one-liners
  }

  app.use(expressWinston.logger(loggerOptions));
  app.use("/", routes);
  return app;
}

export default createServer;
