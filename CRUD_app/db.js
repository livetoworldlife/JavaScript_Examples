const MongoClient = require('mongodb').MongoClient,
  ObjectID = require('mongodb').ObjectID,
  dbname = "crud_mongodb";

// default local host
const url = "mongodb://localhost:27017";

// url parser
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true // i wrote that after i get error
};
// nodejs between mongodb state
const state = {
  db: null
};

const connect = (cb) => {
  if (state.db) {
    cb();
  } else {
    MongoClient.connect(url, mongoOptions, (err, client) => {
      if (err) {
        cb(err);
      } else {
        state.db = client.db(dbname);
        cb();
      }
    });
  }
};

const getPrimaryKey = (_id) => {
  return ObjectID(_id);
};

const getDB = () => {
  return state.db;
};

module.exports = { getDB, connect, getPrimaryKey };