import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink, useLocation } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { Box, Link, Drawer, Typography, Avatar } from "@mui/material";

import useResponsive from "../hooks/useResponsive";

import Scrollbar from "./Scrollbar";
import NavSection from "../Utils/Layouts/NavSection";

import SidebarData from "../Utils/Data/SidebarData";

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

Sidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function Sidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive("up", "lg");

  const user = useSelector((state) => state.firebase.auth);

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  const { name, role } = localStorage;
  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        {/* <Logo /> */}
        <h3>TLC</h3>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src="" alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {name}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {role}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection SidebarData={SidebarData} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
