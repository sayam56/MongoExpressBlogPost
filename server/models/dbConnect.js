const { MongoClient } = require('mongodb');

async function connectToDB() {
  const mongoClient = new MongoClient('mongodb://localhost:27023');
  await mongoClient.connect();
  console.log('Connected to MongoDB');
  return mongoClient.db('aliBlogPlatformDB');
}

module.exports = {
  connectToDB,
};
