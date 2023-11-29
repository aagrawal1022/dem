import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface NavBarProps {
  handleDrawerOpen: () => void;
}

export const NavigationBar: React.FC<NavBarProps> = ({ handleDrawerOpen }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleDrawerOpen}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
          <ListItemText primary="DET" style={{textAlign: 'center'}} />
      </Toolbar>
    </AppBar>
  );
};
