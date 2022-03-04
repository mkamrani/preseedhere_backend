import { dbConnect, dbCloseConnection } from '../../src/models/db';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongod: MongoMemoryServer;


const connect = async () => {
  mongod = await MongoMemoryServer.create();
  // connect to mongodb
  const uri = mongod.getUri();
  await dbConnect(uri);
};

const clearDatabase = async () => {
  // close mongodb connection
    // get all the mongodb collections
    const collections = mongoose.connection.collections;
    // drop all the collections
    try {
      
      for (const key in collections) { 
          const collection = collections[key];
          await collection.drop();
      }
    } catch (error) {
      
    }
    // mongod.stop();
};

const closeDatabase = async () => {
  // drop the mongodb database
  await mongoose.connection.dropDatabase();
  await dbCloseConnection();
  mongod.stop();
};


export { connect, clearDatabase, closeDatabase };