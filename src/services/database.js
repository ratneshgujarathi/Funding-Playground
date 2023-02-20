// db.js
const mongodb = require('mongodb');
const config = require('../config/config');

function db_init(mongoUrl, dbName){
  try {
    const mongo = new mongodb.MongoClient(config.MONGO_URI);
    console.log('Connected to db');
    return mongo.db(dbName);
  } catch (error) {
    console.log('Error in connection');
    process.exit(1)
  }
}

const db = db_init(config.MONGO_URI, config.DB_NAME);

module.exports = db;
