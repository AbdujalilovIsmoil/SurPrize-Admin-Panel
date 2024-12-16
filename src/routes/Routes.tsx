import { useState } from "react";
import navigations from "./navigations";
import { navigationsInterface } from "types";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Logout, Settings, PersonAdd, MenuOutlined } from "@mui/icons-material";

import {
  Box,
  Menu,
  List,
  Avatar,
  AppBar,
  Drawer,
  Tooltip,
  Divider,
  Toolbar,
  MenuItem,
  Typography,
  IconButton,
  CssBaseline,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

const ResponsiveDrawer = (props: Props) => {
  const { window } = props;

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClose = (path: string) => {
    switch (path) {
      case "login":
        navigate(`/pages/auth/${path}`);
        return;

      default:
        setAnchorEl(null);
    }
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {navigations.length > 0 &&
          navigations.map((el: navigationsInterface) => {
            return (
              <>
                <ListItemButton
                  key={el.id}
                  disabled={pathname === el.path}
                  onClick={() => navigate(el.path)}
                >
                  <ListItemIcon>{el.icon}</ListItemIcon>
                  <ListItemText primary={el.title} />
                </ListItemButton>
                <Divider />
              </>
            );
          })}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ ml: 0, display: { md: "none" } }}
          >
            <MenuOutlined />
          </IconButton>
          <Box className="flex justify-between items-center w-[100%]">
            <Typography variant="h6" noWrap component="div">
              SurPrize
            </Typography>
            <>
              <Box
                sx={{
                  display: "flex",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton
                    size="small"
                    sx={{ ml: 2 }}
                    aria-haspopup="true"
                    onClick={handleClick}
                    aria-expanded={open ? "true" : undefined}
                    aria-controls={open ? "account-menu" : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={() => handleClose("")}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem>
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem>
                  <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={() => handleClose("login")}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        aria-label="mailbox folders"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default ResponsiveDrawer;
