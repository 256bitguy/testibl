import React, { useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { BrowserRouter, Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import ThemeProvider from "./theme";
import Routes from "./Routes";
import Login from "./Pages/Auth/Login";
import { Box, CircularProgress } from "@mui/material";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const App = () => {
  const user = useSelector((state) => state.firebase.auth);

  const [open, setOpen] = useState(false);

  return (
    <RootStyle>
      <ThemeProvider>
        <BrowserRouter>
          {    (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
          { <Login/>}
          {  (
            <>
              <Navbar onOpenSidebar={() => setOpen(true)} />
              <Sidebar
                isOpenSidebar={open}
                onCloseSidebar={() => setOpen(false)}
              />
              <MainStyle>
                <Outlet />
                <Routes />
              </MainStyle>
            </>
          )}
        </BrowserRouter>
      </ThemeProvider>
    </RootStyle>
  );
};

export default App;
