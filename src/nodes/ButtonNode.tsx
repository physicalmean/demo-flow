import { useState } from "react";
import { NodeProps, Position, useReactFlow, Node } from "reactflow";
import { Box, Popover } from "@mui/material";
import CustomHandle from "../components/CustomHandle";
import { getNewNodeId } from "../util";

export type ButtonBaseType = {
  targetId?: string;
  content?: string;
};

export type ButtonNodeProps = {
  message?: string;
  buttons?: ButtonBaseType[];
};

export type buttonNodeType = {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: ButtonNodeProps;
};

export default function ButtonNode({
  id,
  type,
  data,
}: NodeProps<ButtonNodeProps>) {
  const reactFlow = useReactFlow();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const onDuplicate = () => {
    if (id) {
      const selectNode = reactFlow.getNode(id);

      const position = reactFlow.screenToFlowPosition({
        x: (selectNode?.position.x || 0) + 800,
        y: (selectNode?.position.y || 0) + 60,
      });

      // create a new node with the type and position
      const newNodeId = getNewNodeId(reactFlow.getNodes());
      const newNode: Node = {
        id: newNodeId,
        type,
        position,
        data: selectNode?.data || {},
      };
      reactFlow.setNodes((nodes) => nodes.concat(newNode));
      handleClose();
    }
  };

  const onDelete = () => {
    if (id) {
      reactFlow.setNodes((nodes) => nodes.filter((item) => item.id !== id));
      handleClose();
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="msg-node border-2 shadow-xl bg-white min-w-60 rounded-md max-w-[350px] break-words hover:ring-4 hover:ring-sky-500">
      <div className="p-6 pt-0 pb-0 px-0">
        <div className="flex items-center py-3 gap-8 px-3 justify-around">
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
          <div className="flex flex-col">
            <h3 className="text-lg text-gray-900 font-bold">Buttons</h3>
          </div>
          <div onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="lucide lucide-ellipsis size-5"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </div>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "center",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "left",
            }}
            className="ml-4"
          >
            <Box className="flex flex-col bg-white">
              <button
                onClick={onDuplicate}
                className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="lucide lucide-copy size-5"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                </svg>
                <span> Duplicate node</span>
              </button>
              <button
                onClick={onDelete}
                className="flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="lucide lucide-trash2 size-5"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  <line x1="10" x2="10" y1="11" y2="17"></line>
                  <line x1="14" x2="14" y1="11" y2="17"></line>
                </svg>
                <span>Delete node</span>
              </button>
            </Box>
          </Popover>
        </div>
        <div className="w-full">
          <div className="flex flex-col items-center justify-center gap-2 bg-gray-200 py-3 px-2  ">
            <div className="bg-white w-full  p-3 rounded-md">
              <h3>{data.message || "Click to edit"}</h3>
            </div>
          </div>
        </div>
      </div>
      <CustomHandle id={id} type="target" position={Position.Left} />
      <CustomHandle id={id} type="source" position={Position.Right} />
    </div>
  );
}
