import type { Edge, EdgeTypes } from "reactflow";
import CustomEdge from "./CustomEdge";

export const initialEdges = [] satisfies Edge[];

export const edgeTypes: EdgeTypes = {
  default: CustomEdge,
};
