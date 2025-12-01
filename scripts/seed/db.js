import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config({ path: ".env.local" });

export default async function connect() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("MONGO_URI is required to run seed scripts");
  }

  const client = new MongoClient(uri, { appName: "luxry-seed" });
  await client.connect();
  const dbName = process.env.MONGO_DB || new URL(uri).pathname.replace("/", "") || "luxry";
  return { client, db: client.db(dbName || "luxry") };
}
