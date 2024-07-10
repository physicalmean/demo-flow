import { Edge, Node } from "reactflow";

function getNewNodeId(nodes: Node[]): string {
  const lastId = Math.max(...nodes.map((node) => parseInt(node.id)));
  return (lastId + 1).toString();
}

function isDuplicateEdgeStart(edges: Edge[], connection: any): boolean {
  return edges.some((edge) => {
    // console.log(edge.source, connection.source);
    return edge.source === connection.source;
  });
}

// Check if user has selected a single node so that we can handle the edition of the node in editor
function isValidUniqueSelection(selection: { nodes: Node[]; edges: Edge[] }) {
  return selection.nodes.length === 1 && selection.edges.length === 0;
}

// Check if the flow is valid as per the requirements
// There should be more than 1 node with empty target handles
function validateFlow(nodes: Node[], edges: Edge[]): boolean {
  if (nodes.length < 2) {
    return true;
  }

  const nodeTargetCounts = new Map<string, number>();
  nodes.forEach((node) => {
    nodeTargetCounts.set(node.id, 0);
  });

  edges.forEach((edge) => {
    const currentCount = nodeTargetCounts.get(edge?.target);
    if (nodeTargetCounts.has(edge.target) && currentCount !== undefined) {
      nodeTargetCounts.set(edge.target, currentCount + 1);
    }
  });

  let emptyTargetHandlesCount = 0;
  nodeTargetCounts.forEach((count) => {
    if (count === 0) {
      emptyTargetHandlesCount++;
    }
  });

  return emptyTargetHandlesCount <= 1;
}

export {
  getNewNodeId,
  isDuplicateEdgeStart,
  isValidUniqueSelection,
  validateFlow,
};
