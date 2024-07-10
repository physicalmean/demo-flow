import React from "react";
import { Typography } from "@mui/material";
import { nodeTypes } from "../nodes";
import { BiMessageRounded } from "react-icons/bi";
import { MdOutlineSmartButton, MdAddCard } from "react-icons/md";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderIcon: any = {
  message: <BiMessageRounded size={24} />,
  buttons: <MdOutlineSmartButton size={24} />,
  card: <MdAddCard size={24} />,
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
