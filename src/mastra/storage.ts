import { MongoDBStore } from "@mastra/mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("need process.env.MONGODB_URI");
}
if (!process.env.MONGODB_DATABASE) {
  throw new Error("need process.env.MONGODB_DATABASE");
}

export const recepieStorage = new MongoDBStore({
  id: "recepie-storage",
  uri: process.env.MONGODB_URI,
  dbName: process.env.MONGODB_DATABASE_MASTRA || "",
});

export const agentStorage = new MongoDBStore({
  id: "agent-storage",
  uri: process.env.MONGODB_URI,
  dbName: process.env.MONGODB_DATABASE,
});
