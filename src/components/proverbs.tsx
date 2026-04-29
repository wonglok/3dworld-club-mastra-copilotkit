import { AgentStateType } from "@/mastra/agents";
import { AbstractAgent } from "@ag-ui/client";
import { useCopilotChat } from "@copilotkit/react-core";
import { useCopilotKit } from "@copilotkit/react-core/v2";

export interface ProverbsCardProps {
  state: AgentStateType;
  setState: (state: AgentStateType) => void;
  agent?: AbstractAgent;
}

export function ProverbsCard({ state, setState, agent }: ProverbsCardProps) {
  // const chat = useCopilotChat();
  return (
    <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-2xl w-full">
      <h1 className="text-4xl font-bold text-white mb-2 text-center">
        Proverbs
      </h1>
      <p className="text-gray-200 text-center italic mb-6">
        This is a demonstrative page, but it could be anything you want! 🪁
      </p>
      <hr className="border-white/20 my-6" />
      <div className="flex flex-col gap-3">
        <div className="h-[400px] overflow-scroll">
          {state?.proverbs?.map((proverb, index) => (
            <div
              key={index + proverb}
              className="bg-white/15 p-4 rounded-xl text-white relative group hover:bg-white/20 transition-all mb-3"
            >
              <p className="pr-8">{proverb}</p>
              <button
                onClick={() => {
                  //
                  //
                  agent?.addMessage({
                    id: `_${Math.random().toString(36).slice(2, 9)}`,
                    role: "user",
                    content: `remove this proverb: ${proverb}`,
                  });
                  agent?.runAgent().then(() => {
                    setState({
                      ...state,
                      proverbs: state.proverbs?.filter((_, i) => i !== index),
                    });
                  });
                }}
                className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity 
                bg-red-500 hover:bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
      {state.proverbs?.length === 0 && (
        <p className="text-center text-white/80 italic my-8">
          No proverbs yet. Ask the assistant to add some!
        </p>
      )}
    </div>
  );
}
