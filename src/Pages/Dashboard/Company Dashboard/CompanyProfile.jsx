import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider,
  Button,
  Skeleton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Page from "../../../Components/Page";
import profilePic from "../../../Assets/profilepic.png";
import AssetDashboard from "../Asset Dashboard/AssetDashboard";
import {
  getCompanyAssets,
  getCompanies,
} from "../../../Redux/Actions/AdminActions";
import ClientUsersDashboard from "../Cleint Users Dashboard/ClientUsersDashboard";
import Breadcrumb from "../../../Components/Breadcrumb";

const CompanyProfile = () => {
  const { companyId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!getCompaniesResponse) {
      dispatch(getCompanies());
    }
  }, [dispatch]);

  const [dashboardParameter, setDashBoardParameter] = useState("");

  const { getCompaniesLoading, getCompaniesResponse, getCompaniesError } =
    useSelector((state) => state.getCompanies);

  // const {
  //   getCompanyAssetsLoading,
  //   getCompanyAssetsResponse,
  //   getCompanyAssetsError,
  // } = useSelector((state) => state.getCompanyAssets);

  const currentCompany =
    !getCompaniesLoading &&
    getCompaniesResponse &&
    getCompaniesResponse.length > 0 &&
    getCompaniesResponse[
      getCompaniesResponse.map((company) => company.id).indexOf(companyId)
    ];

  const handleDashboardParameter = (dashboardParameter) => {
    if (dashboardParameter === "Assets") {
      dispatch(getCompanyAssets(companyId));
    }
    setDashBoardParameter(dashboardParameter);
  };

  return (
    <Page title="Company Profile">
      <Breadcrumb
        prevPagesList={[
          { name: "Dashboard", link: "/admin-dashboard" },
          { name: "Company Dashboard", link: "/company-dashboard" },
        ]}
        activePage={"Company Profile"}
      />
      <Container>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              Company Profile
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
                    alt="company logo"
                    style={{ height: 200, width: 200 }}
                  />
                </Box>
                <Box
                  sx={{
                    mt: 1,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button variant="outlined" sx={{ width: 200 }}>
                    Edit Profile Pic
                  </Button>
                </Box>
              </Grid>
              <Grid lg={6} md={8} sm={12}>
                <Box
                  sx={{
                    m: 5,
                  }}
                >
                  <Typography variant="h4">
                    {/* {!currentCompany && <Skeleton variant="rectangular" />} */}
                    {currentCompany && currentCompany.get("name").toUpperCase()}
                  </Typography>
                  <Typography variant="h6">
                    {/* {!currentCompany && <Skeleton variant="rectangular" />} */}
                    {currentCompany &&
                      currentCompany.get("industory") + " Industory"}
                  </Typography>
                  <Typography variant="body1">
                    {/* {!currentCompany && <Skeleton variant="rectangular" />} */}
                    {currentCompany && currentCompany.get("type") + " Company"}
                  </Typography>
                  <Typography variant="body1">
                    {/* {!currentCompany && <Skeleton variant="rectangular" />} */}
                    {currentCompany && currentCompany.get("size") + " Size"}
                  </Typography>
                  <Typography variant="body2">
                    {/* {!currentCompany && <Skeleton variant="rectangular" />} */}
                    {currentCompany &&
                      "Address :" + currentCompany.get("address")}
                  </Typography>
                  <Typography variant="body2">
                    {/* {!currentCompany && <Skeleton variant="rectangular" />} */}

                    {currentCompany &&
                      "Contact : +91-" + currentCompany.get("phoneNumber")}
                  </Typography>
                  <Typography variant="body2">
                    {currentCompany && "Email : " + currentCompany.get("email")}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />

            <Grid container columnGap={1} rowGap={1}>
              <Grid item>
                <Link
                  to={`/update-company/${currentCompany && currentCompany.id}`}
                >
                  <Button variant="outlined" size="small">
                    Update Company
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleDashboardParameter("Users")}
                >
                  Manage Users
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleDashboardParameter("Assets")}
                >
                  Manage Assets
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="error" size="small">
                  Delete Company
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>

      <Container sx={{ mt: 1 }}>
        {dashboardParameter && dashboardParameter === "Assets" && (
          <Card variant="outlined" sx={{ p: 2 }}>
            <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
              Asset Dashboard
            </Typography>
            <AssetDashboard companyId={companyId} />
          </Card>
        )}
        {dashboardParameter && dashboardParameter === "Users" && (
          <Card variant="outlined" sx={{ p: 2 }}>
            <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
              Company Users Dashboard
            </Typography>
            <ClientUsersDashboard
              companyId={companyId}
              clientUsers={currentCompany.get("users")}
            />
          </Card>
        )}
      </Container>
    </Page>
  );
};

export default CompanyProfile;
