import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

// TODO: Hide it when the user signout
const AdminNavbar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen(!open);

  const navigate = useNavigate();

  const navigateToPath = (path) => {
    navigate(path);
    toggleDrawer();
  };

  const signoutAdmin = async () => {
    await signOut(auth);
    localStorage.removeItem('current-user');

    setTimeout(() => {
        navigate('/login');
        toggleDrawer();
    }, 2000);
  }

  return (
    <div>
      <AppBar>
        <Toolbar>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* TODO: Create this common */}
      <Box role="presentation">
        <Drawer anchor={"left"} open={open} onClose={toggleDrawer}>
          <Box height="100%" display='flex' flexDirection='column' justifyContent='space-between'>
            <List>
              <ListItem>
                <ListItemButton
                  onClick={() => navigateToPath("/admin/dashboard")}
                >
                  Home
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton
                  onClick={() => navigateToPath("/admin/products")}
                >
                  Products
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton onClick={() => navigateToPath("/admin/users")}>
                  Users
                </ListItemButton>
              </ListItem>
            </List>

            <Button onClick={signoutAdmin} style={{ margin: '20px'}} color="error" variant="contained">
              Signout
            </Button>
          </Box>
        </Drawer>
      </Box>
    </div>
  );
};

export default AdminNavbar;
