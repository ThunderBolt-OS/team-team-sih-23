import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import Sidebar from "./Sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  isMenu: boolean;
  isGoBack: boolean;
}

function Navbar({ isMenu = false, isGoBack = false }: NavbarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Box
        component="nav"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={2}
        mx={isGoBack ? 1 : 4}
      >
        <Box display="flex" alignItems="center">
          {isGoBack && (
            <IconButton
              onClick={() => navigate(-1)}
              sx={{
                mr: 2,
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="h6">Bus App</Typography>
        </Box>
        {isMenu && (
          <IconButton onClick={() => setIsSidebarOpen(true)}>
            <MenuIcon />
          </IconButton>
        )}
      </Box>
      <Sidebar isOpen={isSidebarOpen} setOpen={setIsSidebarOpen} />
    </>
  );
}

export default Navbar;
