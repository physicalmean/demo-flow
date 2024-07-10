import { useState } from "react";
import NodesHousing from "./NodesHousing";
import { ActiveNodeProps } from "./NodeEditor";
import { Viewport, useOnSelectionChange, useOnViewportChange } from "reactflow";
import { isValidUniqueSelection } from "../util";
import {
  styled,
  IconButton,
  Divider,
  Typography,
  OutlinedInput,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

export default function SidePanel({ setActiveNode, onClose }: ActiveNodeProps) {
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
          Type to search
        </Typography>
        <OutlinedInput
          onChange={(event) => setSearch(event.target.value)}
          className="w-full bg-white"
          placeholder="Search"
          endAdornment={<FaSearch size={20} />}
        />
        <div className="py-4">
          <Typography variant="h6" className="pb-2">
            Most used
          </Typography>
          <NodesHousing search={search} />
        </div>
      </div>
    </Container>
  );
}

const Container = styled("aside")({
  height: "calc(100vh - 65px)",
});
