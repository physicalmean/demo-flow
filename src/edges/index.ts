import type { Edge } from "reactflow";

export const initialEdges = [
  { id: "1-2", source: "1", target: "2" },
  { id: "2-4", source: "2", target: "4" },
] satisfies Edge[];
