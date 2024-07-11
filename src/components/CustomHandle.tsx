import {
  Box,
  ClickAwayListener,
  Typography,
  Popover,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import {
  addEdge,
  Edge,
  Handle,
  HandleProps,
  MarkerType,
  Node,
  Position,
  useReactFlow,
} from "reactflow";
import { renderIcon } from "./NodesHousing";
import { nodeTypes } from "../nodes";
import { getNewNodeId } from "../util";

export default function CustomHandle(props: HandleProps) {
  const reactFlow = useReactFlow();

  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSelectNodeType = (type: string) => {
    if (props.id) {
      const selectNode = reactFlow.getNode(props.id);

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
        data: [{ message: `` }],
      };
      reactFlow.setNodes((nodes) => nodes.concat(newNode));

      const edge: Edge = {
        id: `${props.id}-${newNodeId}`,
        source: props.id,
        target: newNodeId,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: "gray",
        },
        style: {
          strokeWidth: 2,
          stroke: "rgb(144 97 249)",
        },
      };
      reactFlow.setEdges((edges) => addEdge(edge, edges));
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box>
        <Handle
          id="output-edge"
          onClick={handleClick}
          style={{
            width: 20,
            height: 20,
            background: "rgb(144 97 249)",
            position: "absolute",
            border: "unset",
            right: props.position === Position.Left ? "unset" : "-11px",
            left: props.position === Position.Left ? "-11px" : "unset",
          }}
          className="flex justify-center items-center"
          {...props}
        >
          <HiPlus size={16} color="#fff" />
        </Handle>
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
          <Box className="p-4 bg-[#1F2937]">
            <Typography variant="h6" className="text-white pb-2">
              Type to search
            </Typography>
            <OutlinedInput
              onChange={(event) => setSearch(event.target.value)}
              className="w-full bg-white h-[48px]"
              placeholder="Search"
              endAdornment={<FaSearch size={20} />}
            />
            <div className="py-4">
              <Typography variant="h6" className="text-white pb-2">
                Most used
              </Typography>
              {Object.keys(nodeTypes)
                .filter(
                  (itemKey) =>
                    itemKey
                      .toLocaleLowerCase()
                      .includes(search.toLowerCase()) &&
                    itemKey.toLocaleLowerCase() !== "start"
                )
                .map((nodeType) => (
                  <div
                    key={nodeType}
                    onClick={() => onSelectNodeType(nodeType)}
                    className="mt-1 px-2 py-3 flex items-center justify-between hover:bg-gray-700 gap-4 w-full hover:shadow-md transition-all duration-300 cursor-grab"
                  >
                    <div className="flex items-center gap-4 w-full">
                      {renderIcon[nodeType]}
                      <h6 className="text-white text-lg capitalize">
                        {nodeType}
                      </h6>
                    </div>
                  </div>
                ))}
            </div>
          </Box>
        </Popover>
      </Box>
    </ClickAwayListener>
  );
}
