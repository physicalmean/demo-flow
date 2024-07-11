import { useEffect, useRef, useState } from "react";
import { Node, useReactFlow } from "reactflow";

export type ActiveNodeProps = {
  activeNode: Node | null;
  setActiveNode: React.Dispatch<React.SetStateAction<Node | null>>;
};

/* This component will be used to edit the properties of the selected node
 Regardless of node type, we will able to edit it
 */
export default function NodeEditor({
  activeNode,
  setActiveNode,
}: ActiveNodeProps) {
  return (
    <div className="border rounded-sm py-3 px-2">
      {activeNode && (
        <>
          {activeNode.type === "message" && (
            <MessageEditor
              activeNode={activeNode}
              setActiveNode={setActiveNode}
            />
          )}
        </>
      )}
    </div>
  );
}

function MessageEditor({ activeNode, setActiveNode }: ActiveNodeProps) {
  const [message, setMessage] = useState<string>(activeNode?.data.message);
  const inputMessageRef = useRef<HTMLTextAreaElement>(null);
  const reactFlow = useReactFlow();

  // update activeNode on change of message
  const handleActiveNodeChange = (message: string) => {
    if (!activeNode) {
      return;
    }
    const latestNodeInstance = reactFlow.getNode(activeNode.id);
    const updatedNodeObj = {
      ...latestNodeInstance,
      data: {
        ...latestNodeInstance?.data,
        message,
      },
    };
    // @ts-expect-error-next-line
    setActiveNode(updatedNodeObj);
  };

  useEffect(() => {
    // update the message on change of activeNode
    setMessage(activeNode?.data.message);
  }, [activeNode?.data.message]);

  useEffect(() => {
    if (inputMessageRef.current) {
      inputMessageRef.current.focus();
    }
  }, [activeNode]);

  return (
    <div className="h-[calc(100vh-280px)] overflow-y-auto py-2 pr-2">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-5 ">
          <div className="first:pt-0 border px-3 py-3 rounded-lg">
            <div className="flex justify-end mb-5">
              <button
                type="button"
                className="text-sm text-black hover:bg-gray-200 p-1 rounded-md transition-all duration-500 focus:outline-none sm:mt-4 sm:col-span-1 self-end"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="lucide lucide-trash"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
                <span className="sr-only">remove</span>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-2 flex flex-col">
                <textarea
                  className="flex min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                  name="messages.0.message"
                  placeholder="Write a message"
                  id=":r3:-form-item"
                  aria-describedby=":r3:-form-item-description"
                  aria-invalid="false"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full sm:w-auto bg-transparent text-black font-semibold hover:bg-gray-300 self-start border border-black"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="lucide lucide-plus mr-1"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
              Add Message
            </button>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full sm:w-auto bg-transparent text-black font-semibold hover:bg-gray-300 self-start border border-black"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="lucide lucide-plus mr-1"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
              Add Media
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
