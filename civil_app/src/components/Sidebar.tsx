import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { menuList } from "../utils/menuList.tsx";
import { Link, useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function Sidebar({ isOpen, setOpen }: SidebarProps) {
  const closeSidebar = () => setOpen(false);
  const navigate = useNavigate();
  return (
    <>
      <Drawer
        // variant="temporary"
        anchor="left"
        open={isOpen}
        onClose={closeSidebar}
        sx={{ width: "100%" }}
      >
        <Box
          width="100%"
          role="presentation"
          onClick={closeSidebar}
          onKeyDown={closeSidebar}
        >
          <List sx={{ width: "50vw" }}>
            {menuList.map(({ text, icon, route }) => (
              <ListItem
                key={text}
                disablePadding
                onClick={() => navigate(route)}
              >
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Sidebar;
