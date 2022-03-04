import debug from "debug";

import { dbConnect, dbCloseConnection } from "./models/db";
import { exit } from "process";
import createServer from "./server";

const PORT = process.env.PORT || 8001;
const MONGODB_URL = process.env.MONGODB_URI || "mongodb://localhost:27017/db";

(async () => {
  try {
    // connect to mongodb
    await dbConnect(MONGODB_URL, {});
    
  } catch (err: any) {
    console.log("Error connecting to mongodb: ", err.message);
    exit(1);
  }

  const app = createServer();
  const server = app.listen(PORT, () => {
    console.log(`⚡️Server is listening on port: ${PORT}`);
  });
  process.on("SIGTERM", () => {
    debug("SIGTERM signal received: closing HTTP server");
    server.close(() => {
      debug("HTTP server closed");
    });
    dbCloseConnection()
      .then(() => {
        debug("Mongoose connection closed");
      })
      .catch((err: Error) => {
        debug(`Error closing Mongoose connection: ${err.message}`);
      });
  });

})();


