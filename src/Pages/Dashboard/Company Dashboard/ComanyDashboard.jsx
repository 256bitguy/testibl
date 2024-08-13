import React from "react";
import Page from "../../../Components/Page";
import Iconify from "../../../Utils/Layouts/Iconify";
import Scrollbar from "../../../Components/Scrollbar";
import { Link } from "react-router-dom";
import CompanyTable from "../../../Components/Companies/CompanyTable";
import {
  FormControl,
  Box,
  Container,
  Grid,
  Button,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import Breadcrumb from "../../../Components/Breadcrumb";

const CompanyDashboard = () => {
  return (
    <Page title="User Dashboard">
      <Breadcrumb
        prevPagesList={[{ name: "Dashboard", link: "/admin-dashboard" }]}
        activePage={"Company Dasboard"}
      />
      <Container>
        <Grid container columnSpacing={2}>
          <Grid item xs={10}>
            <FormControl fullWidth>
              <TextField placeholder="Search user" type="text" size="medium" />
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Link to="/add-company">
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                >
                  New Company
                </Button>
              </Link>
            </Stack>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 5 }}>
          <CompanyTable />
        </Box>
      </Container>
    </Page>
  );
};

export default CompanyDashboard;
