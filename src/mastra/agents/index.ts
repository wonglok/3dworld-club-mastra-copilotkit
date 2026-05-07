// import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { weatherTool } from "@/mastra/tools";
// import { LibSQLStore } from "@mastra/libsql";
import { z } from "zod";
import { Memory } from "@mastra/memory";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { agentStorage } from "../storage";
// import { agentStorage } from "../storage";

const deepseekProvider = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY ?? "",
});

let deepSeekChatModel = deepseekProvider.languageModel("deepseek-v4-flash");

let lmStudioModel = createOpenAICompatible({
  baseURL: "http://localhost:1234/v1",
  name: "lmstudio",
  headers: {
    Authorization: `Bearer ${process.env.MY_API_KEY}`,
  },
}).languageModel("google/gemma-4-e2b", {
  supportsStructuredOutputs: true,
  provider: "openai",
});

export const AgentState = z.object({
  proverbs: z
    .array(
      z.object({
        slug: z.string(),
        verse: z.string(),
        text: z.string(),
      }),
    )
    .default([]),

  //
  // recepie: z
  //   .object({
  //     ingredients: z.array(
  //       z.object({
  //         name: z.string(),
  //         emoji: z.string(),
  //       }),
  //     ),
  //     instructions: z.array(z.object({ step: z.string() })),
  //   })
  //   .optional(),
});

export const initData = {
  //
};

export type AgentStateType = z.infer<typeof AgentState>;

export const myAgentCopilot = new Agent({
  id: "myAgentCopilot",
  name: "myAgentCopilot",
  tools: { weatherTool },
  model:
    // deepSeekChatModel,
    process.env.NODE_ENV === "development" ? lmStudioModel : deepSeekChatModel,

  //

  instructions: "You are a helpful assistant.",
  memory: new Memory({
    // storage: new LibSQLStore({
    //   id: "weather-agent-memory",
    //   url: "file::memory:",
    // }),
    storage: agentStorage as any,
    options: {
      workingMemory: {
        enabled: true,
        schema: AgentState,
        scope: "thread",
      },
    },
  }) as any,
});

//

//

//
