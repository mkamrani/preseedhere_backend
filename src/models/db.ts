// implement connection to mongodb with mongoose
import mongoose from "mongoose";
import { exit } from "process";

// declare mongoose connect options
const connectDefaultOptions = {};

// connect to mongodb
function dbConnect(
  uri: string,
  connectOptions: mongoose.ConnectOptions = connectDefaultOptions
): Promise<void> {
  return new Promise((resolve, reject) => {
    mongoose.connection.on("open", function (ref) {
      console.log("Connected to mongo server.");
      resolve();
    });
    mongoose.connection.on("error", function (err) {
      console.log("Could not connect to mongo server!");
      reject(err);
    });
    console.log(`Connecting to mongodb: ${uri}`);
    mongoose.connect(uri);
  })
}

// close mongodb connection
function dbCloseConnection() {
  return mongoose.connection.close();
}




export { dbConnect, dbCloseConnection };
