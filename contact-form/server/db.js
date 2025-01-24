const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI; // Add your MongoDB URI in .env
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connect() {
  if (!db) {
    await client.connect();
    db = client.db('contact-form'); // Replace with your database name
  }
  return db;
}

module.exports = { connect };