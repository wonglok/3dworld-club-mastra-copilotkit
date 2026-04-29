import { MongoDBStore } from "@mastra/mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("need process.env.MONGODB_URI");
}
if (!process.env.MONGODB_DATABASE) {
  throw new Error("need process.env.MONGODB_DATABASE");
}

export const storage = new MongoDBStore({
  id: "mongodb-storage",
  uri: process.env.MONGODB_URI,
  dbName: process.env.MONGODB_DATABASE,
});

export const agentStorage = new MongoDBStore({
  id: "agent-storage",
  uri: process.env.MONGODB_URI,
  dbName: process.env.MONGODB_DATABASE,
});
