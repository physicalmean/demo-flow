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
import { Handle, HandleProps } from "reactflow";
import { renderIcon } from "./NodesHousing";
import { nodeTypes } from "../nodes";

export default function CustomHandle(props: HandleProps) {
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box>
        <Handle
          id="basic-select"
          onClick={handleClick}
          style={{
            width: 32,
            height: 32,
            background: "#1976D2",
            position: "absolute",
            right: "-16px",
          }}
          className="flex justify-center items-center"
          {...props}
        >
          <HiPlus size={24} color="#fff" />
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
