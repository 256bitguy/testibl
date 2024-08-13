import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Iconify from "../../../../Utils/Layouts/Iconify";
import Scrollbar from "../../../../Components/Scrollbar";
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
import { getAssetSpares } from "../../../../Redux/Actions/AdminActions";
import AssetSparesTable from "../../../../Components/Assets/AssetSparesTable";

const AssetSparesDashboard = ({ assetId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAssetSpares(assetId));
  }, [dispatch]);

  const { getAssetSparesLoading, getAssetSparesResponse, getAssetSparesError } =
    useSelector((state) => state.getAssetSpares);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item sm={12} lg={10} md={10}>
          <FormControl fullWidth>
            <TextField placeholder="Search Spare" type="text" size="medium" />
          </FormControl>
        </Grid>

        <Grid item sm={2} lg={2} md={2}>
          <Link to={`/add-asset-spare/${assetId}`}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Add Spare
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 5 }}>
        <AssetSparesTable
          assetId={assetId}
          getAssetSparesLoading={getAssetSparesLoading}
          getAssetSparesResponse={getAssetSparesResponse}
        />
      </Box>
    </Container>
  );
};

export default AssetSparesDashboard;
