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
} from "reactflow";

import "reactflow/dist/style.css";

import { initialNodes, nodeTypes } from "../nodes";
import { initialEdges } from "../edges";
import { getNewNodeId, validateFlow, isDuplicateEdgeStart } from "../util";

import SidePanel from "./SidePanel";
import { toast } from "sonner";
import { Button, IconButton, styled, Typography } from "@mui/material";
import { HiPlus } from "react-icons/hi";

export default function FlowBuilder() {
  const reactFlow = useReactFlow();

  // initial states for nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes as []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [activeNode, setActiveNode] = useState<Node | null>(null);

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
    if (typeof type === "undefined" || !type || type !== "message") {
      return;
    }
    const position = reactFlow.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    // create a new node with the type and position
    const newNode: Node = {
      id: getNewNodeId(nodes),
      type,
      position,
      data: { message: `` },
    };

    setNodes((nodes) => nodes.concat(newNode));
    // update active node
    setActiveNode(newNode);
  };

  // Save flow handler
  const saveFlow = () => {
    const isFlowValid = validateFlow(nodes, edges);
    if (!isFlowValid) {
      toast.error("Cannot save flow");
      return;
    }

    // save flow
    console.log("flow_state", {
      nodes,
      edges,
    });
    toast.success("Flow saved");
  };

  return (
    <section>
      <nav className="flex justify-between items-center bg-white px-40 py-3 shadow-md">
        <Typography variant="h5" className="font-bold">
          New Bot
        </Typography>
        <Button variant="outlined" onClick={saveFlow}>
          Test this bot
        </Button>
      </nav>

      <main className="flow-container flex w-full">
        {/* Side Panel */}
        {openDrawer && (
          <SidePanel
            activeNode={activeNode}
            setActiveNode={setActiveNode}
            onClose={() => setOpenDrawer(false)}
          />
        )}
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
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Background />
            {/* <MiniMap /> */}
            <Controls />
          </ReactFlow>
        </ContainerReactFlow>
      </main>
    </section>
  );
}

const ContainerReactFlow = styled("div")({
  height: "calc(100vh - 65px)",
  position: "relative",
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
