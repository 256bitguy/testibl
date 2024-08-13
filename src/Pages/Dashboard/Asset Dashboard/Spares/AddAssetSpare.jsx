import {
  Card,
  Container,
  TextField,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Grid,
  Box,
  Divider,
  InputAdornment,
  Button,
  FormHelperText,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Page from "../../../../Components/Page";
import Iconify from "../../../../Utils/Layouts/Iconify";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  addAssetSpare,
  getSpares,
} from "../../../../Redux/Actions/AdminActions";
import LoadingButton from "@mui/lab/LoadingButton";
import { assetSpareSchema } from "../../../../Schemas/assetSpareSchema";
import * as AdminConstants from "../../../../Redux/Constants/AdminConstants";
import CustomSnackbar from "../../../../Utils/Layouts/CustomSnackbar";
import Breadcrumb from "../../../../Components/Breadcrumb";

const AddAssetSpare = () => {
  const { assetId } = useParams();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (assetId) {
      dispatch(getSpares());
    }
  }, [dispatch]);

  const { addAssetSpareLoading, addAssetSpareResponse, addAssetSpareError } =
    useSelector((state) => state.addAssetSpare);

  const { getSparesLoading, getSparesResponse, getSparesError } = useSelector(
    (state) => state.getSpares
  );

  const [searchedSpares, setSearchedSpares] = useState(
    getSparesResponse && getSparesResponse
  );

  const initialValues = {
    spareId: "",
    description: "",
    assetId: assetId,
    spareDetails: undefined,
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: assetSpareSchema,
      onSubmit: (values, action) => {
        dispatch(addAssetSpare(values));
      },
    });

  useEffect(() => {
    if (!addAssetSpareLoading && addAssetSpareResponse) {
      setAlertOpen(true);
      setAlertMessage("Spare Added");
      setAlertSeverity("success");
      values.spareId = "";
      values.description = "";
      values.spareDetails = undefined;
      dispatch({ type: AdminConstants.ADD_ASSET_SPARE_RESET_STATE });
    }
    if (!addAssetSpareLoading && addAssetSpareError) {
      setAlertOpen(true);
      setAlertMessage(addAssetSpareError);
      setAlertSeverity("error");
      dispatch({ type: AdminConstants.ADD_ASSET_SPARE_RESET_STATE });
    }
  }, [dispatch, values, addAssetSpareResponse, addAssetSpareError]);

  const handleSearchSpare = (e) => {
    if (e.target.value) {
      let searchedSparesData = [];
      searchedSparesData =
        getSparesResponse &&
        getSparesResponse.filter((spare) =>
          spare.get("name").toLowerCase().match(e.target.value.toLowerCase())
        );
      setSearchedSpares(searchedSparesData);
    } else {
      setSearchedSpares(getSparesResponse);
    }
  };

  return (
    <Page title="Add Spare">
      <Breadcrumb
        prevPagesList={[
          { name: "Dashboard", link: "/admin-dashboard" },
          { name: "Company Dashboard", link: "/company-dashboard" },
          {
            name: "Asset Profile",
            link: `/asset-profile/${assetId}`,
          },
        ]}
        activePage={"Add Spare"}
      />
      <Container>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Add Spare
        </Typography>
      </Container>
      <Container>
        <Card variant="outlined" sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h4" sx={{ m: 1 }}>
              Select Spare
            </Typography>
            <Box sx={{ m: 2 }}>
              <FormControl fullWidth>
                <InputLabel
                  id="spare"
                  sx={{
                    color: touched.spareId && errors.spareId && "red",
                  }}
                >
                  Select Spare
                </InputLabel>
                <Select
                  labelId="spare-id"
                  id="spare-id"
                  label="Select Spare"
                  name="spareId"
                  value={values.spareId}
                  onChange={(e) => {
                    handleChange(e);
                    values.spareDetails =
                      !getSparesLoading &&
                      getSparesResponse &&
                      getSparesResponse.length > 0 &&
                      getSparesResponse[
                        getSparesResponse
                          .map((spare) => spare.id)
                          .indexOf(e.target.value)
                      ];
                  }}
                  onBlur={handleBlur}
                  MenuProps={{ autoFocus: false }}
                  error={touched.spareId && errors.spareId}
                >
                  <TextField
                    fullWidth
                    autoFocus
                    variant="filled"
                    placeholder="Search Spare..."
                    id="search"
                    name="search"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Iconify icon="akar-icons:search" />
                        </InputAdornment>
                      ),
                    }}
                    onChange={handleSearchSpare}
                    onKeyDown={(e) => {
                      if (e.key !== "Escape") {
                        e.stopPropagation();
                      }
                    }}
                  />

                  {!getSparesLoading &&
                    searchedSpares &&
                    searchedSpares.map((spare) => (
                      <MenuItem key={spare.id} value={spare.id}>
                        {spare.get("name")}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText sx={{ color: "red" }}>
                  {touched.spareId && errors.spareId && errors.spareId}
                </FormHelperText>
              </FormControl>
            </Box>

            <Typography variant="h4" sx={{ m: 1 }}>
              Spare Details
            </Typography>

            <Grid container>
              {values.spareDetails && (
                <>
                  <Grid sm={12} lg={6} md={6}>
                    <Box sx={{ m: 2 }}>
                      <Typography sx={{ my: 1 }}>Spare Name</Typography>

                      <FormControl fullWidth>
                        <TextField
                          variant="outlined"
                          label=""
                          placeholder="Enter Spare Name"
                          id="name"
                          name="name"
                          value={values.spareDetails.get("name")}
                        />
                      </FormControl>
                    </Box>
                    <Box sx={{ m: 2 }}>
                      <Typography sx={{ my: 1 }}>Spare Price</Typography>

                      <FormControl fullWidth>
                        <TextField
                          variant="outlined"
                          label=""
                          placeholder="Enter Spare Price"
                          name="price"
                          value={values.spareDetails.get("price")}
                        />
                      </FormControl>
                    </Box>
                  </Grid>

                  <Grid sm={12} lg={6} md={6}>
                    <Box sx={{ m: 2 }}>
                      <Typography sx={{ my: 1 }}>Spare Type</Typography>

                      <FormControl fullWidth>
                        <TextField
                          variant="outlined"
                          label=""
                          placeholder="Enter Spare Type"
                          name="type"
                          value={values.spareDetails.get("type")}
                        />
                      </FormControl>
                    </Box>
                    <Box sx={{ m: 2 }}>
                      {values.spareDetails.get("image").url && (
                        <FormControl fullWidth>
                          <Typography sx={{ my: 1 }}>Spare Image</Typography>
                          <Box sx={{ m: 1 }}>
                            <a
                              href={values.spareDetails.get("image").url}
                              target="_blank"
                            >
                              {values.spareDetails.get("image").name}
                            </a>
                          </Box>
                        </FormControl>
                      )}
                      {!values.spareDetails.get("image").url && (
                        <>
                          <Typography sx={{ my: 1 }}>Spare Image</Typography>
                          <Box sx={{ m: 1 }}>
                            <Typography sx={{ my: 2, color: "red" }}>
                              No image found for this spare.
                            </Typography>
                          </Box>
                        </>
                      )}
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
            {!values.spareDetails && (
              <Typography
                variant="h6"
                sx={{ m: 2, textAlign: "center", color: "red" }}
              >
                Please Select Spare
              </Typography>
            )}

            <Typography variant="h4" sx={{ m: 1 }}>
              Other Details
            </Typography>
            <Box sx={{ m: 2 }}>
              <FormControl fullWidth>
                <TextField
                  multiline
                  rows={5}
                  variant="outlined"
                  label="Spare Description"
                  placeholder="Enter Spare Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.description && errors.description}
                  helperText={
                    touched.description &&
                    errors.description &&
                    errors.description
                  }
                />
              </FormControl>
            </Box>

            <Box sx={{ m: 5, textAlign: "center" }}>
              <LoadingButton
                variant="outlined"
                size="large"
                type="submit"
                loading={addAssetSpareLoading}
              >
                Submit
              </LoadingButton>
            </Box>

            <CustomSnackbar
              open={alertOpen}
              message={alertMessage}
              severity={alertSeverity}
              handleClose={() => setAlertOpen(false)}
            />
          </form>
        </Card>
      </Container>
    </Page>
  );
};

export default AddAssetSpare;
