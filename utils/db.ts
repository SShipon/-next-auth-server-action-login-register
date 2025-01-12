/* eslint-disable prefer-const */
import { MongoClient } from "mongodb";

// MongoDB URI পরিবেশ থেকে আনা হচ্ছে
const uri = process.env.MONGODB_URI || "";  // .env ফাইল থেকে Mongo URI নিয়ে আসুন
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env");
}

client = new MongoClient(uri, options);
clientPromise = client.connect();
export const db = (await clientPromise).db("next-auth-server");  
