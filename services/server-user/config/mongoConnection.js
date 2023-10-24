const { MongoClient } = require("mongodb");

const connectionString =
  "mongodb+srv://octavianaxelputra:pRHk7f4YBceUhQdD@clusterracenews.jxxtyj2.mongodb.net/";

let db = null;
let DB_NAME = "RaceNews_User";

const mongoConnect = async () => {
  const client = new MongoClient(connectionString);

  try {
    const database = client.db(DB_NAME);

    db = database;

    return database;
  } catch (err) {
    await client.close();
  }
};

const getDatabase = () => db;

module.exports = {
  mongoConnect,
  getDatabase,
};
