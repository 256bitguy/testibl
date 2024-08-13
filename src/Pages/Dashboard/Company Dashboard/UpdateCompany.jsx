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
import Page from "../../../Components/Page";
import Iconify from "../../../Utils/Layouts/Iconify";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { companySchema } from "../../../Schemas/companySchema";
import { CompanyTypes, IndustoriesList } from "../../../Utils/Data/AppData";
import { updateCompany } from "../../../Redux/Actions/AdminActions";
import LoadingButton from "@mui/lab/LoadingButton";
import * as AdminConstants from "../../../Redux/Constants/AdminConstants";
import CustomSnackbar from "../../../Utils/Layouts/CustomSnackbar";
import Breadcrumb from "../../../Components/Breadcrumb";

const UpdateCompany = () => {
  const dispatch = useDispatch();
  const { companyId } = useParams();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const {
    getCompaniesLoading,
    getCompaniesResponse,
    getCompaniesError,
    updateResponse,
  } = useSelector((state) => state.getCompanies);

  const currentCompany =
    !getCompaniesLoading &&
    getCompaniesResponse &&
    getCompaniesResponse.length > 0 &&
    getCompaniesResponse[
      getCompaniesResponse.map((company) => company.id).indexOf(companyId)
    ];

  const initialValues = {
    name: (currentCompany && currentCompany.get("name")) || "",
    industory: (currentCompany && currentCompany.get("industory")) || "",
    size: (currentCompany && currentCompany.get("size")) || "",
    type: (currentCompany && currentCompany.get("type")) || "",
    website: (currentCompany && currentCompany.get("website")) || "",
    email: (currentCompany && currentCompany.get("email")) || "",
    phoneNumber: (currentCompany && currentCompany.get("phoneNumber")) || "",
    address: (currentCompany && currentCompany.get("address")) || "",
    description: (currentCompany && currentCompany.get("description")) || "",
    companyId: currentCompany && companyId,
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: companySchema,
      onSubmit: (values, action) => {
        dispatch(updateCompany(values));
      },
    });

  useEffect(() => {
    if (!getCompaniesLoading && getCompaniesResponse && updateResponse) {
      setAlertOpen(true);
      setAlertMessage("Company Updated");
      setAlertSeverity("success");
      dispatch({ type: AdminConstants.GET_COMPANIES_RESET_STATE });
    }
  }, [dispatch, getCompaniesResponse, updateResponse]);

  return (
    <Page title="Update Company">
      <Breadcrumb
        prevPagesList={[
          { name: "Dashboard", link: "/admin-dashboard" },
          { name: "Company Dashboard", link: "/company-dashboard" },
          { name: "Company Profile", link: `/company-profile/${companyId}` },
        ]}
        activePage={"Update Company"}
      />
      <Container>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Update Company
        </Typography>
      </Container>
      <Container>
        <Card variant="outlined" sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h4" sx={{ m: 1 }}>
              Company Details
            </Typography>

            <Grid container>
              <Grid sm={12} lg={6} md={6}>
                <Box sx={{ m: 2 }}>
                  <FormControl fullWidth>
                    <TextField
                      variant="outlined"
                      label="Company Name"
                      placeholder="Enter Company Name"
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.name && errors.name}
                      helperText={touched.name && errors.name && errors.name}
                    />
                  </FormControl>
                </Box>
                <Box sx={{ m: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="company-industory"
                      sx={{
                        color: touched.industory && errors.industory && "red",
                      }}
                    >
                      Industory
                    </InputLabel>
                    <Select
                      labelId="company-industory"
                      id="industory"
                      label="Industory"
                      name="industory"
                      value={values.industory}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.industory && errors.industory}
                    >
                      {IndustoriesList.map((industory) => (
                        <MenuItem value={industory}>{industory}</MenuItem>
                      ))}
                    </Select>
                    <FormHelperText sx={{ color: "red" }}>
                      {touched.industory &&
                        errors.industory &&
                        errors.industory}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Grid>

              <Grid sm={12} lg={6} md={6}>
                <Box sx={{ m: 2 }}>
                  <FormControl fullWidth>
                    <TextField
                      variant="outlined"
                      label="Company Size"
                      placeholder="Enter Company Size"
                      name="size"
                      value={values.size}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.size && errors.size}
                      helperText={touched.size && errors.size && errors.size}
                    />
                  </FormControl>
                </Box>
                <Box sx={{ m: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="company-type"
                      sx={{
                        color: touched.type && errors.type && "red",
                      }}
                    >
                      Company Type
                    </InputLabel>
                    <Select
                      labelId="company-type"
                      id="type"
                      label="Company Type"
                      name="type"
                      value={values.type}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.type && errors.type}
                    >
                      {CompanyTypes.map((type) => (
                        <MenuItem value={type}>{type}</MenuItem>
                      ))}
                    </Select>
                    <FormHelperText sx={{ color: "red" }}>
                      {touched.type && errors.type && errors.type}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <Divider />
            </Box>
            <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
              Contact Details
            </Typography>
            <Grid container>
              <Grid sm={12} lg={6} md={6}>
                <Box sx={{ m: 2 }}>
                  <FormControl fullWidth>
                    <TextField
                      variant="outlined"
                      label="Company Website"
                      placeholder="Enter Company Website"
                      name="website"
                      value={values.website}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.website && errors.website}
                      helperText={
                        touched.website && errors.website && errors.website
                      }
                    />
                  </FormControl>
                </Box>
                <Box sx={{ m: 2 }}>
                  <FormControl fullWidth>
                    <FormControl fullWidth>
                      <TextField
                        variant="outlined"
                        label="Company Email"
                        placeholder="Enter Company Email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && errors.email}
                        helperText={
                          touched.email && errors.email && errors.email
                        }
                      />
                    </FormControl>
                  </FormControl>
                </Box>
              </Grid>

              <Grid sm={12} lg={6} md={6}>
                <Box sx={{ m: 2 }}>
                  <FormControl fullWidth>
                    <TextField
                      variant="outlined"
                      label="Company Phone Number"
                      placeholder="Enter Company Phone Number"
                      name="phoneNumber"
                      type={"number"}
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.phoneNumber && errors.phoneNumber}
                      helperText={
                        touched.phoneNumber &&
                        errors.phoneNumber &&
                        errors.phoneNumber
                      }
                    />
                  </FormControl>
                </Box>
                <Box sx={{ m: 2 }}>
                  <FormControl fullWidth>
                    <FormControl fullWidth>
                      <TextField
                        multiline
                        rows={5}
                        variant="outlined"
                        label="Company Address"
                        placeholder="Enter Company Address"
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.address && errors.address}
                        helperText={
                          touched.address && errors.address && errors.address
                        }
                      />
                    </FormControl>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <Divider />
            </Box>
            <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
              Other Details
            </Typography>
            <Box sx={{ m: 2 }}>
              <FormControl fullWidth>
                <TextField
                  multiline
                  rows={5}
                  variant="outlined"
                  label="Short Description"
                  placeholder="Enter Short Description"
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
                loading={getCompaniesLoading}
              >
                Update
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

export default UpdateCompany;
