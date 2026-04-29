"use client";

import { ProverbsCard } from "@/components/proverbs";
import { WeatherCard } from "@/components/weather";
import { MoonCard } from "@/components/moon";
import { useCoAgent, useCopilotAction } from "@copilotkit/react-core";
import { CopilotKitCSSProperties, CopilotSidebar } from "@copilotkit/react-ui";
import { useState } from "react";
import { AgentStateType } from "@/mastra/agents";
import { useAgent } from "@copilotkit/react-core/v2";

export default function CopilotKitPage() {
  const [themeColor, setThemeColor] = useState("#6366f1");

  // 🪁 Frontend Actions: https://docs.copilotkit.ai/mastra/frontend-actions
  useCopilotAction({
    name: "setThemeColor",
    description: `set the theme color of the webstie.`,
    parameters: [
      {
        name: "themeColor",
        description: "The theme color to set. Make sure to pick nice colors.",
        required: true,
      },
    ],
    handler({ themeColor }) {
      setThemeColor(themeColor);
    },
  });

  return (
    <main
      style={
        { "--copilot-kit-primary-color": themeColor } as CopilotKitCSSProperties
      }
    >
      <CopilotSidebar
        defaultOpen
        disableSystemMessage={true}
        clickOutsideToClose={false}
        onSubmitMessage={(message) => {
          //
          console.log(message);
          //
        }}
        labels={{
          title: "Popup Assistant",
          initial: "👋 Hi, there! You're chatting with an agent.",
        }}
        suggestions={[
          {
            title: "Set theme based on the mood of the day in HK",
            message:
              "What's the weather today in Hong Kong and then set the theme color based on today's weather mood",
          },
          {
            title: "Hong Kong Weather",
            message: "Get the weather in Hong Kong.",
          },
          {
            title: "Try Green Theme",
            message: "Set the theme to green.",
          },
          {
            title: "Human In the Loop",
            message: "Please go to the moon.",
          },
          {
            title: "Add 10 proverbs",
            message: "add 10 proverbs in the bible into the list.",
          },
          {
            title: "Remove 5 random proverbs",
            message:
              "Please remove 5 random proverb from the list if there are any.",
          },
          {
            title: "List out the existing proverbs",
            message: "What are the proverbs?",
          },
        ]}
      >
        <YourMainContent themeColor={themeColor} />
      </CopilotSidebar>
    </main>
  );
}

//

function YourMainContent({ themeColor }: { themeColor: string }) {
  // 🪁 Shared State: https://docs.copilotkit.ai/mastra/shared-state/in-app-agent-read
  const { state, setState, name } = useCoAgent<AgentStateType>({
    name: "myAgentCopilot",
    initialState: {
      proverbs: [
        "CopilotKit may be new, but its the best thing since sliced bread.",
        "An Apple a day, my money flys away.",
      ],
    },
  });

  const { agent } = useAgent({ agentId: name });

  //🪁 Generative UI: https://docs.copilotkit.ai/mastra/generative-ui/tool-based
  useCopilotAction(
    {
      name: "weatherTool",
      description: "Get the weather for a given location.",
      available: "disabled",
      parameters: [
        //
        { name: "location", type: "string", required: true },
        //
      ],
      render: ({ args, result }) => {
        return (
          <WeatherCard
            result={result}
            location={args.location}
            themeColor={themeColor}
          />
        );
      },
    },
    [themeColor],
  );

  //

  // 🪁 Human In the Loop: https://docs.copilotkit.ai/mastra/human-in-the-loop
  useCopilotAction(
    {
      name: "go_to_moon",
      description: "Go to the moon on request.",
      renderAndWaitForResponse: ({ respond, status }) => {
        return (
          <MoonCard themeColor={themeColor} status={status} respond={respond} />
        );
      },
    },
    [themeColor],
  );

  return (
    <div
      style={{ backgroundColor: themeColor }}
      className="h-screen flex justify-center items-center flex-col transition-colors duration-300"
    >
      <ProverbsCard state={state} setState={setState} agent={agent} />
    </div>
  );
}
