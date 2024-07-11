/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  OnConnect,
  useReactFlow,
  Node,
  BackgroundVariant,
  MarkerType,
} from "reactflow";

import "reactflow/dist/style.css";

import { initialNodes, nodeTypes } from "../nodes";
import { initialEdges } from "../edges";
import { getNewNodeId, isDuplicateEdgeStart } from "../util";

import SidePanel from "./SidePanel";
import { Button, IconButton, styled, Typography } from "@mui/material";
import { HiPlus } from "react-icons/hi";
import LiveChat from "./LiveChat";

export default function FlowBuilder() {
  const reactFlow = useReactFlow();

  // initial states for nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes as []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [activeNode, setActiveNode] = useState<Node | null>(null);
  const [showTestChat, setShowTestChat] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  // validate & Handle connections between nodes
  const onConnect: OnConnect = (connection) => {
    // Avoid duplicate edges starting from the same node
    if (isDuplicateEdgeStart(edges, connection)) {
      console.log("Duplicate edge start");
      return;
    }

    const edge = {
      id: `${connection.source}-${connection.target}`,
      ...connection,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: "#FF0072",
      },
      label: "marker size and color",
      style: {
        strokeWidth: 2,
        stroke: "#FF0072",
      },
    };
    setEdges((edges) => addEdge(edge, edges));
  };

  // * Handlers for Drag and Drop functionality
  // fired when dragging over
  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // fired when dropping
  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const type = event.dataTransfer.getData("application/reactflow");
    if (!type || !Object.keys(nodeTypes).includes(type)) return;
    const position = reactFlow.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    // create a new node with the type and position
    const newNode: Node = {
      id: getNewNodeId(nodes),
      type,
      position,
      data: [{ message: `` }],
    };

    setNodes((nodes) => nodes.concat(newNode));
  };

  return (
    <section className="h-screen overflow-hidden">
      <nav className="flex justify-between items-center bg-white px-40 py-3 shadow-md">
        <Typography variant="h5" className="font-bold">
          New Bot
        </Typography>
        <Button variant="outlined" onClick={() => setShowTestChat(true)}>
          Test this bot
        </Button>
      </nav>

      <main className="flow-container flex w-full relative">
        {/* Side Panel */}
        {openDrawer && <SidePanel onClose={() => setOpenDrawer(false)} />}
        <ContainerReactFlow
          sx={{ width: openDrawer ? "calc(100vw - 500px)" : "100vw" }}
        >
          <ButtonAdd size="large" onClick={() => setOpenDrawer(true)}>
            <HiPlus />
          </ButtonAdd>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            // edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Background
              color="gray"
              gap={50}
              variant={BackgroundVariant.Lines}
            />
            {/* <MiniMap /> */}
            <Controls />
          </ReactFlow>
          {showTestChat && <LiveChat onClose={() => setShowTestChat(false)} />}
        </ContainerReactFlow>
      </main>
    </section>
  );
}

const ContainerReactFlow = styled("div")({
  height: "calc(100vh - 65px)",
  position: "relative",
  backgroundColor: "#454b6b",
});

const ButtonAdd = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 16,
  left: 16,
  zIndex: 10,
  color: "white",
  backgroundColor: theme.palette.primary.main,
  ":hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));
