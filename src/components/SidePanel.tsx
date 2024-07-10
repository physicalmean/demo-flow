import { useEffect, useState } from "react";
import NodesHousing from "./NodesHousing";
import NodeEditor, { ActiveNodeProps } from "./NodeEditor";
import {
  Viewport,
  useOnSelectionChange,
  useOnViewportChange,
  useReactFlow,
} from "reactflow";
import { isValidUniqueSelection } from "../util";
import {
  styled,
  IconButton,
  Divider,
  FormControl,
  Typography,
  InputAdornment,
  InputLabel,
  FilledInput,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

export default function SidePanel({
  activeNode,
  setActiveNode,
  onClose,
}: ActiveNodeProps) {
  const reactFlow = useReactFlow();
  const [search, setSearch] = useState("");

  // This will get triggered on selection change of item (node, edge) on the viewport
  useOnSelectionChange({
    onChange: ({ nodes, edges }) => {
      if (!isValidUniqueSelection({ nodes, edges })) {
        return;
      } else {
        setActiveNode(nodes[0]);
      }
    },
  });

  /* 
This will get triggered on change of viewport selection,
 we can use this to identify if user has clicked on the viewport to deselect the node
*/
  useOnViewportChange({
    onStart: (viewport: Viewport) => {
      console.log("viewport", viewport);
      setActiveNode(null);
    },
  });

  // Update the node in the react flow
  useEffect(() => {
    reactFlow.setNodes((nodes) => {
      return nodes.map((node) => {
        if (node.id === activeNode?.id) {
          return activeNode;
        }
        return node;
      });
    });
  }, [activeNode]);

  return (
    <Container className="bg-[#eef0f7] border rounded-md transition-['width'] duration-300 h-screen flex flex-col pb-6 z-30 w-[500px] opacity-100">
      <div className="flex justify-end items-center px-4 py-3">
        <IconButton onClick={onClose}>
          <IoClose />
        </IconButton>
      </div>
      <Divider />
      <div className="py-6 px-4">
        <Typography variant="h6" className="pb-2">
          Type of search
        </Typography>
        <FormControl variant="filled" fullWidth>
          <InputLabel htmlFor="filled-adornment-password">Search</InputLabel>
          <FilledInput
            onChange={(event) => setSearch(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <FaSearch size={20} />
              </InputAdornment>
            }
          />
        </FormControl>
        <div className="py-4">
          <Typography variant="h6" className="pb-2">
            Most used
          </Typography>
          {activeNode ? (
            <NodeEditor activeNode={activeNode} setActiveNode={setActiveNode} />
          ) : (
            <NodesHousing search={search} />
          )}
        </div>
      </div>
    </Container>
  );
}

const Container = styled("aside")({
  height: "calc(100vh - 65px)",
});
