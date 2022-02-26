import bodyParser from 'body-parser';
import express from 'express';
import routes from './routes';
import debug from 'debug';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';

import { dbConnect, dbCloseConnection } from './models/db';
import { exit } from 'process';

// connect to mongodb
dbConnect(process.env.MONGODB_URI || 'mongodb://localhost:27017/db', {
}).then(() => {
  console.log('Connected to mongodb');
}).catch((err) => {
  console.log('Error connecting to mongodb: ', err);
  exit(1);
});



const app = express();
const PORT = 8000;

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


app.use('/', routes);
const server = app.listen(PORT, () => {
  console.log(`⚡️Server is listening on port: ${PORT}`);
});


process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    debug('HTTP server closed');
  });
  dbCloseConnection().then(() => {
    debug('Mongoose connection closed');
  }).catch((err: Error) => { 
    debug(`Error closing Mongoose connection: ${err.message}`);
  });
})