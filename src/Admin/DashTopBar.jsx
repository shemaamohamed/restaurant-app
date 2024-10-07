import {
  Box,
  IconButton,
  Stack,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { AccountCircle, Notifications } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "rgb(255, 208, 0) ",
  color: "black",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));
function DashTopBar({ open, handleDrawerOpen }) {
  const navigate = useNavigate();

  // const [auth, setAuth] = React.useState(true);

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[
            {
              marginRight: 5,
            },
            open && { display: "none" },
          ]}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Admin Dashboard
        </Typography>
        <Box flexGrow={1} />

        <Stack direction={"row"}>
          <IconButton onClick={() => navigate("/messages")} color="inherit">
            <Notifications />
          </IconButton>

          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => navigate("/adminprofile")}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default DashTopBar;
