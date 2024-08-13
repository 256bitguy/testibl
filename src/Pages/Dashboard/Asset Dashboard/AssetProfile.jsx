import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Page from "../../../Components/Page";
import profilePic from "../../../Assets/profilepic.png";
import AssetDashboard from "../Asset Dashboard/AssetDashboard";
import {
  getCompanyAssetById,
  getCompanyAssets,
} from "../../../Redux/Actions/AdminActions";
import AssetSparesDashboard from "./Spares/AssetSparesDashboard";
import Breadcrumb from "../../../Components/Breadcrumb";

const AssetProfile = () => {
  const dispatch = useDispatch();

  const { assetId } = useParams();

  useEffect(() => {
    if (!getCompanyAssetsResponse || !getCompanyAssetByIdResponse) {
      console.log("Here");
      dispatch(getCompanyAssetById(assetId));
    }
  }, [dispatch]);

  const {
    getCompanyAssetsLoading,
    getCompanyAssetsResponse,
    getCompanyAssetsError,
  } = useSelector((state) => state.getCompanyAssets);

  const {
    getCompanyAssetByIdLoading,
    getCompanyAssetByIdResponse,
    getCompanyAssetByIdError,
  } = useSelector((state) => state.getCompanyAssetById);

  const currentAsset =
    !getCompanyAssetsLoading && getCompanyAssetsResponse
      ? getCompanyAssetsResponse.length > 0 &&
        getCompanyAssetsResponse[
          getCompanyAssetsResponse.map((asset) => asset.id).indexOf(assetId)
        ]
      : !getCompanyAssetByIdLoading &&
        getCompanyAssetByIdResponse &&
        getCompanyAssetByIdResponse;

  return (
    <Page title="Asset Profile">
      <Breadcrumb
        prevPagesList={[
          { name: "Dashboard", link: "/admin-dashboard" },
          { name: "Company Dashboard", link: "/company-dashboard" },
          {
            name: "Company Profile",
            link: `/company-profile/${
              currentAsset && currentAsset.get("companyId")
            }`,
          },
        ]}
        activePage={"Asset Profile"}
      />
      <Container>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              Asset Profile
            </Typography>
            <Grid container sx={{ display: "flex", justifyContent: "center" }}>
              <Grid lg={6} md={4} sm={12}>
                <Box
                  sx={{
                    mt: 5,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={profilePic}
                    alt="asset"
                    style={{ height: 200, width: 200 }}
                  />
                </Box>
                <Box
                  sx={{
                    mt: 1,
                    display: "flex",
                    justifyContent: "center",
                  }}
                ></Box>
              </Grid>
              <Grid lg={6} md={8} sm={12}>
                <Box
                  sx={{
                    m: 5,
                  }}
                >
                  <Typography variant="h4">
                    {currentAsset && currentAsset.get("name")}
                  </Typography>
                  <Typography variant="h6">
                    {currentAsset && currentAsset.get("jobStatus")}
                  </Typography>
                  <Typography variant="body1">
                    {currentAsset && currentAsset.get("type")}
                  </Typography>
                  <Typography variant="body1">
                    Service Engineer :{" "}
                    {currentAsset && currentAsset.get("serviceEngineer")}
                  </Typography>
                  <Typography variant="body2">
                    Promised Delivery Date :{" "}
                    {currentAsset && currentAsset.get("promisedDeliveryDate")}
                  </Typography>
                  <Typography variant="body2">
                    Requested DeliveryDate :
                    {currentAsset && currentAsset.get("requestedDeliveryDate")}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ my: 1 }} />
            <Grid container columnGap={1} rowGap={1}>
              <Grid item>
                <Link to={`/update-asset/${currentAsset && currentAsset.id}`}>
                  <Button variant="outlined">Update Asset</Button>
                </Link>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>

      <Container sx={{ mt: 2 }}>
        <Card sx={{ p: 5 }}>
          <Typography variant="h5" sx={{ mb: 5, textAlign: "center" }}>
            Spares Dashboard
          </Typography>
          <AssetSparesDashboard assetId={assetId} />
        </Card>
      </Container>
    </Page>
  );
};

export default AssetProfile;
