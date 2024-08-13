import React from "react";
import Page from "../../Components/Page";
import Iconify from "../../Utils/Layouts/Iconify";
import Scrollbar from "../../Components/Scrollbar";
import AdminDashboardCard from "../../Components/AdminDashboardCard";
import { Grid, Typography, Button, Box, Container } from "@mui/material";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Page title="Dashboard">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
      </Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {/* <Grid>
            <Link to="/user-dashboard">
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  "& > :not(style)": {
                    m: 1,
                    width: 200,
                    height: 200,
                  },
                }}
              >
                <Button>Manage Users</Button>
              </Box>
            </Link>
          </Grid> */}
          <Grid>
            <Link to="/company-dashboard">
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  "& > :not(style)": {
                    m: 1,
                    width: 200,
                    height: 200,
                  },
                }}
              >
                <Button>Manage Companies</Button>
              </Box>
            </Link>
          </Grid>
          <Grid>
            <Link to="/spare-dashboard">
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  "& > :not(style)": {
                    m: 1,
                    width: 200,
                    height: 200,
                  },
                }}
              >
                <Button>Manage Spares</Button>
              </Box>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
};

export default AdminDashboard;
