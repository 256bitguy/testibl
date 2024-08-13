import React from "react";
import Page from "../../../Components/Page";
import Iconify from "../../../Utils/Layouts/Iconify";
import Scrollbar from "../../../Components/Scrollbar";
import { Link } from "react-router-dom";
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
import AssetTable from "../../../Components/Assets/AssetTable";

const AssetDashboard = ({ companyId }) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item sm={12} lg={10} md={10}>
          <FormControl fullWidth>
            <TextField placeholder="Search Asset" type="text" size="medium" />
          </FormControl>
        </Grid>

        <Grid item sm={2} lg={2} md={2}>
          <Link to={`/add-asset/${companyId}`}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Add Asset
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 5 }}>
        <AssetTable />
      </Box>
    </Container>
  );
};

export default AssetDashboard;
