const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoUrl = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;
const collectionName = 'products';

const connectToMongo = async () => {
  try {
    const client = await MongoClient.connect(mongoUrl);
    const db = client.db(dbName);
    return db.collection(collectionName);
  } catch (error) {
    console.log('Gagal terhubung ke MongoDB:', error);
  }
};

module.exports = { connectToMongo };
