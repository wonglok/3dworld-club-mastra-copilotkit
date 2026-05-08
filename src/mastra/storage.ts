import { MongoDBStore } from "@mastra/mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("need process.env.MONGODB_URI");
}

export const recepieStorage = new MongoDBStore({
  id: "recepie-storage",
  uri: process.env.MONGODB_URI,
  dbName: "recepie-stroage",
});

export const agentStorage = new MongoDBStore({
  id: "agent-storage",
  uri: process.env.MONGODB_URI,
  dbName: "agent-storage",
});
