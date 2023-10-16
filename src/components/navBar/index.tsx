import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Link,
} from "@mui/material";

import { useAuth } from "../../hooks/useAuth";

type Props = {
  children?: ReactNode;
};

const navItems = [
  { name: "خانه", route: "/" },
  { name: "سالن ها", route: "/salon" },
  { name: "سرویس ها", route: "/service" },
  { name: "سفارشات", route: "/order" },
];

const NavBar = ({ children }: Props) => {
  const [Open, setOpen] = React.useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ my: 2 }}>
            پنل ادمین
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: "200px", boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
          <Divider />
          <List>
            {navItems.map((item, index) => (
              <Link
                color="inherit"
                key={index}
                href={item.route}
                sx={{ textDecoration: "none" }}
              >
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
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
      </Drawer>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default NavBar;
