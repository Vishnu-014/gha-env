// database.js
import { MongoClient } from "mongodb";
import 'dotenv/config';

const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;
console.log(clusterAddress, dbUser, dbPassword, dbName);

const uri = `mongodb+srv://${dbUser}:${dbPassword}@${clusterAddress}/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);
let database;

export async function connectDB() {
  try {
    console.log("Trying to connect to db...");
    await client.connect();
    await client.db(dbName).command({ ping: 1 });
    console.log("✅ Connected successfully to MongoDB");
    database = client.db(dbName);
    return database;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

// 👇 default export for routes
export default function getDB() {
  if (!database) {
    throw new Error("Database not initialized. Call connectDB() first.");
  }
  return database;
}
