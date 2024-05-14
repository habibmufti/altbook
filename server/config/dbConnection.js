// const { MongoClient } = require("mongodb");
import { MongoClient } from "mongodb";

// Replace the uri string with your connection string.
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

const database = client.db("gc01")

export default {client, database}