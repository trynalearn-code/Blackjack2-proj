import { MongoClient } from "mongodb";
import "dotenv/config"

const client = new MongoClient(process.env.MONGO_URI)

await client.connect();

const db = client.db("blackjack")

console.log("Successfully connected to MongoDB!");
export default db