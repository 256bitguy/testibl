import React from "react";
import {
  Stack,
  Button,
  Container,
  Grid,
  FormControl,
  TextField,
  Box,
} from "@mui/material";
import Page from "../../../Components/Page";
import Iconify from "../../../Utils/Layouts/Iconify";
import { Link } from "react-router-dom";
import SparesTable from "../../../Components/Spares/SparesTable";
import Breadcrumb from "../../../Components/Breadcrumb";

const SpareDashboard = () => {
  return (
    <Page title="User Dashboard">
      <Breadcrumb
        prevPagesList={[{ name: "Dashboard", link: "/admin-dashboard" }]}
        activePage={"Spare Dasboard"}
      />
      <Container>
        <Grid container columnSpacing={2}>
          <Grid item xs={10}>
            <FormControl fullWidth>
              <TextField placeholder="Search Spare" type="text" size="medium" />
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Link to="/add-spare">
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                >
                  Add Spare
                </Button>
              </Link>
            </Stack>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 5 }}>
          <SparesTable />
        </Box>
      </Container>
    </Page>
  );
};

export default SpareDashboard;
