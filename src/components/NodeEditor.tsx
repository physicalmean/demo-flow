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
      {/* ... same for others in future*/}
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
    <div>
      <form className="flex flex-col gap-4">
        <label htmlFor="message-input">Message Text</label>
        <textarea
          ref={inputMessageRef}
          className="outline-none border rounded-md p-1 focus:border-blue-600"
          id="message-input"
          placeholder="Enter message"
          value={message}
          onChange={(event) => {
            handleActiveNodeChange(event.target.value); // for node in reactflow
          }}
        />
      </form>
    </div>
  );
}
