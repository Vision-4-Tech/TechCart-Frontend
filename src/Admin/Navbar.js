import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Button, Divider } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import './style.css'
const Navbar = () => {
   const [anchorElNav, setAnchorElNav] =useState()
   const [anchorElUser, setAnchorElUser] =useState();

   const [name,setName]=useState()
   const handleOpenNavMenu = (event) => {
     setAnchorElNav(event.currentTarget);
   };
   const handleOpenUserMenu = (event) => {
     setAnchorElUser(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
     setAnchorElNav(null);
   };

   const handleCloseUserMenu = () => {
     setAnchorElUser(null);
   };
  const navigate = useNavigate();

  useEffect(()=>{
    const data=localStorage.getItem("userDetails")
    const {name}=JSON.parse(data);
    setName(name)
  })
 const Logout = () => {
   
  localStorage.removeItem("userDetails");
   
   navigate("/login");
 };

  return (
    <div className="headers">
      <div className="h1">Dashboard</div>

      <div className="btn"></div>

      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {
            <MenuItem onClick={handleCloseUserMenu} className="menu">
              <Box>
                <Typography>
                  <Button
                    variant="contained"
                    className="logout"
                    onClick={Logout}
                  >
                    Logout
                  </Button>
                  <Divider />
                </Typography>
                <Typography style={{ marginTop: "12px" }}>
                  Admin : {name}
                </Typography>
              </Box>
            </MenuItem>
          }
        </Menu>
      </Box>
    </div>
  );
}

export default Navbar

