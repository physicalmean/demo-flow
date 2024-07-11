import { useState } from "react";
import NodesHousing from "./NodesHousing";
import {
  styled,
  IconButton,
  Divider,
  Typography,
  OutlinedInput,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

type SidePanelProps = {
  onClose?: () => void;
};

export default function SidePanel({ onClose }: SidePanelProps) {
  const [search, setSearch] = useState("");

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
