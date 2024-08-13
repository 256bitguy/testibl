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
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { companySchema } from "../../../Schemas/companySchema";
import { CompanyTypes, IndustoriesList } from "../../../Utils/Data/AppData";
import { addCompany } from "../../../Redux/Actions/AdminActions";
import LoadingButton from "@mui/lab/LoadingButton";
import CustomSnackbar from "../../../Utils/Layouts/CustomSnackbar";
import * as AdminConstants from "../../../Redux/Constants/AdminConstants";
import Breadcrumb from "../../../Components/Breadcrumb";

const AddCompany = () => {
  const dispatch = useDispatch();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const { addCompanyLoading, addCompanyResponse, addCompanyError } =
    useSelector((state) => state.addCompany);

  const initialValues = {
    name: "",
    industory: "",
    size: "",
    type: "",
    website: "",
    email: "",
    phoneNumber: "",
    address: "",
    description: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: companySchema,
      onSubmit: (values, action) => {
        dispatch(addCompany(values));
      },
    });

  useEffect(() => {
    if (
      !addCompanyLoading &&
      addCompanyResponse &&
      addCompanyResponse.user.uid
    ) {
      setAlertOpen(true);
      setAlertMessage("Company Added");
      setAlertSeverity("success");
    }
    if (!addCompanyLoading && addCompanyError) {
      setAlertOpen(true);
      setAlertMessage(
        addCompanyError === "auth/email-already-in-use"
          ? "Email is already registered"
          : "Something Went Wrong!"
      );
      setAlertSeverity("error");
    }
    dispatch({ type: AdminConstants.ADD_COMPANY_RESET_STATE });
  }, [dispatch, addCompanyResponse, addCompanyError]);

  console.log(addCompanyError);

  return (
    <Page title="Add Company">
      <Breadcrumb
        prevPagesList={[
          { name: "Dashboard", link: "/admin-dashboard" },
          { name: "Company Dashboard", link: "/company-dashboard" },
        ]}
        activePage={"Add Company"}
      />
      <Container>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Add Company
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
                loading={addCompanyLoading}
              >
                Submit
              </LoadingButton>
              <CustomSnackbar
                open={alertOpen}
                message={alertMessage}
                severity={alertSeverity}
                handleClose={() => setAlertOpen(false)}
              />
            </Box>
          </form>
        </Card>
      </Container>
    </Page>
  );
};

export default AddCompany;
