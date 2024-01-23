import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../Card";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

export default function ButtonAppBar(props) {
  const navigate = useNavigate();

  const location = useLocation();
  const name= location.state && location.state.name;
  const params = new URLSearchParams(location.search);
  // const name = params.get("name");

  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleProfileClick = () => {
    setAnchorEl(null);
    navigate("/p",); // Replace "/profile" with the actual path of your profile page
  };

  const handleAvatarClick = () => {
    setAuth((prev) => !prev);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#332941" }}>
      <AppBar position="static" sx={{ backgroundColor: "#332941" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            fontWeight={600}
            sx={{ flexGrow: 1, color: "#F8E559" }}>
            {/* Welcome {name} to our  */}
            Kids Story
          </Typography>
          <IconButton color="inherit" onClick={handleMenu}>
            <Avatar />
          </IconButton>
        </Toolbar>
      </AppBar>

      <div>
        {/* <Card /> */}
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </Box>
  );
}
