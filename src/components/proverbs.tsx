import { AgentStateType } from "@/mastra/agents";
import { useAgent } from "@copilotkit/react-core/v2";
// import { useCopilotChat } from "@copilotkit/react-core";
// import { useCopilotKit } from "@copilotkit/react-core/v2";
import { useChatContext } from "@copilotkit/react-ui";
// import { useState } from "react";
// import { AbstractAgent } from "@ag-ui/client";

export interface ProverbsCardProps {
  state: AgentStateType;
  setState: (state: AgentStateType) => void;
  name: string;
}

export function ProverbsCard({ state, setState, name }: ProverbsCardProps) {
  const chat = useChatContext();
  const { agent } = useAgent({ agentId: name });

  return (
    <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-2xl w-full">
      <h1 className="text-4xl font-bold text-white mb-2 text-center">
        Proverbs
      </h1>
      <p className="text-gray-200 text-center italic mb-6">
        This is a demonstrative page, but it could be anything you want! 🪁
      </p>
      <hr className="border-white/20 my-6" />
      <div className="flex flex-col gap-3 relative">
        <div className="max-h-[400px] overflow-scroll">
          <></>
          {state?.proverbs?.map((proverb, index) => (
            <div
              key={index + proverb}
              className="bg-white/15 p-4 rounded-xl text-white relative group hover:bg-white/20 transition-all mb-3 flex justify-between items-center"
            >
              <p className="pr-8">{proverb}</p>

              <button
                disabled={agent?.isRunning}
                onClick={() => {
                  //
                  //
                  chat.setOpen(true);

                  //
                  setTimeout(() => {
                    //
                    agent?.addMessage({
                      id: `_${Math.random().toString(36).slice(2, 9)}`,
                      role: "user",
                      content: `Please Remove Proverb [${index + 1}]: ${proverb}`,
                    });

                    agent?.runAgent({}).then(() => {
                      let newState = {
                        ...state,
                        proverbs: state.proverbs?.filter(
                          (_, index) => _ !== proverb,
                        ),
                      };
                      setState(newState);
                      agent?.setState(newState);
                    });
                    //
                    //
                  }, 10);

                  //
                }}
                className=" opacity-0 group-hover:opacity-100 transition-opacity 
                disabled:bg-gray-800 disabled:text-white
                bg-red-500 hover:bg-red-600 text-white rounded-full h-6 shrink-0 px-2 flex items-center justify-center text-xs"
              >
                {agent?.isRunning ? <>{`Processing...`}</> : `✕`}
              </button>
            </div>
          ))}
        </div>

        {state.proverbs?.length === 0 && (
          <p className="text-center text-white/80 italic my-8">
            No proverbs yet. Ask the assistant to add some!
          </p>
        )}

        <div className="flex justify-center items-center">
          {agent?.isRunning ? (
            <div className="flex justify-center items-center">
              <div className="p-2 text-center block mx-auto text-black bg-white rounded-2xl shadow px-5">
                {`Processing...`}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <pre className="bg-white p-2 rounded-lg text-xs overflow-scroll">
        {JSON.stringify(agent?.state, null, "\t")}
      </pre>
    </div>
  );
}

//
