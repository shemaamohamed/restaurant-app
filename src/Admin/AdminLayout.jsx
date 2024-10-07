import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useMediaQuery } from "@mui/material";
import DashTopBar from "./DashTopBar";
import { styled } from "@mui/material";
import DashSideBar from "./DashSideBar";
import { Outlet } from "react-router-dom";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function AdminLayout() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(!isMobile);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Update state if the screen size changes
  React.useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <DashTopBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <DashSideBar open={open} handleDrawerClose={handleDrawerClose} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
