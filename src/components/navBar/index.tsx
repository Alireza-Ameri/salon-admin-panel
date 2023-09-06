import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../hooks/useAuth";

interface Props {
  window?: () => Window;
}

const navItems = ["خانه", "ادمین ها", "سالن ها"];

const NavBar = (props: Props) => {
  const { window } = props;
  const [Open, setOpen] = React.useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        پنل ادمین
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem key={"خروج"} disablePadding>
          <ListItemButton
            sx={{ textAlign: "center" }}
            onClick={() => {
              logout();
            }}
          >
            <ListItemText primary={"خروج"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          sx={{ textAlign: "center" }}
          container={container}
          variant="temporary"
          open={Open}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          SlideProps={{ style: { width: "300px" } }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default NavBar;
