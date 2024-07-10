import { Box, ClickAwayListener, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { Handle, HandleProps } from "reactflow";

export default function CustomHandle(props: HandleProps) {
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
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          {...props}
        >
          <HiPlus size={24} color="#fff" />
        </Handle>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-select",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Box>
    </ClickAwayListener>
  );
}
