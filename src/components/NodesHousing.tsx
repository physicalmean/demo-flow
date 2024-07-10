import React from "react";
import { Typography } from "@mui/material";
import { nodeTypes } from "../nodes";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderIcon: any = {
  message: (
    <div className="px-1.5 py-1 rounded-md border">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="lucide lucide-message-circle text-gray-500 size-4"
      >
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
      </svg>
    </div>
  ),
  buttons: (
    <div className="px-1.5 py-1 rounded-md border">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gray-500 size-4"
      >
        <path
          d="M40 35.5556C40 38.01 38.01 40 35.5556 40H4.44444C1.99 40 0 38.01 0 35.5556V4.44444C0 1.99 1.99 0 4.44444 0H35.5556C38.01 0 40 1.99 40 4.44444V35.5556Z"
          fill="#3B88C3"
        ></path>
        <path
          d="M20.0001 32.2223C26.7502 32.2223 32.2223 26.7502 32.2223 20.0001C32.2223 13.2499 26.7502 7.77783 20.0001 7.77783C13.2499 7.77783 7.77783 13.2499 7.77783 20.0001C7.77783 26.7502 13.2499 32.2223 20.0001 32.2223Z"
          fill="white"
        ></path>
      </svg>
    </div>
  ),
  card: (
    <div className="px-1.5 py-1 rounded-md border">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="lucide lucide-diamond text-gray-500 size-4"
      >
        <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"></path>
      </svg>
    </div>
  ),
};

export default function NodesHousing({ search = "" }: { search: string }) {
  return (
    <div className="flex gap-3 flex-wrap">
      {Object.keys(nodeTypes)
        .filter(
          (itemKey) =>
            itemKey.toLocaleLowerCase().includes(search.toLowerCase()) &&
            itemKey.toLocaleLowerCase() !== "start"
        )
        .map((nodeType) => {
          return <NodeCard key={nodeType} nodeType={nodeType} />;
        })}
    </div>
  );
}

// * NodeCard component
function NodeCard({ nodeType }: { nodeType: string }) {
  // fired when dragging starts
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    // updating the data to be transferred so that we can recognize the type of node being dragged
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, nodeType)}
      className="node-item flex bg-white items-center flex-col gap-2 rounded-md w-36 px-6 py-3 cursor-pointer hover:bg-gray-100"
    >
      <div>{renderIcon[nodeType]}</div>
      <Typography className="text-sm">
        {nodeType.charAt(0).toUpperCase() + nodeType.slice(1)}
      </Typography>
    </div>
  );
}
