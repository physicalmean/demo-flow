import type { Node, NodeTypes } from "reactflow";
import MessageNode, { messageNodeType } from "./MessageNode";
import StartNode, { startNodeType } from "./StartNode";
import ButtonNode, { buttonNodeType } from "./ButtonNode";
import CardNode, { cardNodeType } from "./CardNode";

// Initial state of the nodes
export const initialNodes: (
  | startNodeType
  | messageNodeType
  | buttonNodeType
  | cardNodeType
)[] = [
  {
    id: "1",
    type: "start",
    position: { x: 0, y: 300 },
    data: {},
  },
] satisfies Node[];

// Node types for the FlowBuilder
export const nodeTypes = {
  start: StartNode,
  message: MessageNode,
  buttons: ButtonNode,
  card: CardNode,
} satisfies NodeTypes;
