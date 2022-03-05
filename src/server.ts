import bodyParser from "body-parser";
import express from "express";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import cors from "cors";
import routes from "./routes";
const passport = require("passport");
const session = require("express-session");
require('./auth/passport_google'); // Load the google passport strategy
require('./auth/passport_github'); // Load the github passport strategy
require('./auth/passport_twitter'); // Load the twitter passport strategy


function createServer(): express.Application {
  const app = express();

  // use body parser middleware
  app.use(bodyParser.json({ limit: "5mb" }));
  app.use(bodyParser.urlencoded({ extended: true }));

  // here we are adding middleware to allow cross-origin requests
  app.use(
    cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );

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

  app.use(
    session({
      secret: "SESSION_SECRET",
      resave: true,
      saveUninitialized: true,
      // cookie: { secure: true },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/", routes);
  return app;
}

export default createServer;
