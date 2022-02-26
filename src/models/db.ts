// implement connection to mongodb with mongoose
import mongoose from 'mongoose';

// declare mongoose connect options
const connectDefaultOptions = {
};

// connect to mongodb
function dbConnect(uri: string, connectOptions: mongoose.ConnectOptions = connectDefaultOptions) {
    return mongoose.connect(uri, {...connectDefaultOptions, ...connectOptions
    } );
}

// close mongodb connection
function dbCloseConnection() {
    return mongoose.connection.close();
}

export {
  dbConnect,
  dbCloseConnection 
}