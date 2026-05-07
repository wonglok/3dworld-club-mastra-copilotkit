import { Mastra } from "@mastra/core/mastra";
import { LibSQLStore } from "@mastra/libsql";
import { myAgentCopilot } from "./agents";
import { ConsoleLogger, LogLevel } from "@mastra/core/logger";
// import { mastraStorage } from "./storage";
// import { storage } from "./storage";

import { UpstashStore } from "@mastra/upstash";

const storage = new UpstashStore({
  id: "upstash-storage",
  url: process.env.KV_REST_API_URL || "",
  token: process.env.KV_REST_API_TOKEN || "",
});

const LOG_LEVEL = (process.env.LOG_LEVEL as LogLevel) || "info";

export const mastra = new Mastra({
  agents: {
    myAgentCopilot: myAgentCopilot,
  },
  // storage: storage,
  // storage: new LibSQLStore({
  //   id: "mastra-storage",
  //   url: process.env.COPILOT_MASTRA_AI_PGHOST || "", //":memory:",
  // }),
  logger: new ConsoleLogger({
    level: LOG_LEVEL,
  }),
});
