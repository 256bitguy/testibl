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
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Page from "../../../Components/Page";
import { useFormik } from "formik";
import { userSchema } from "../../../Schemas/userSchema";
import { createUser, getCompanies } from "../../../Redux/Actions/AdminActions";
import { useState } from "react";
import CustomSnackbar from "../../../Utils/Layouts/CustomSnackbar";
import MuiAlert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import * as AdminConstants from "../../../Redux/Constants/AdminConstants";
import Breadcrumb from "../../../Components/Breadcrumb";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreateClientUser = () => {
  const dispatch = useDispatch();
  const { companyId } = useParams();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  useEffect(() => {
    if (!getCompaniesResponse) {
      dispatch(getCompanies());
    }
  }, [dispatch]);

  const { addUserLoading, addUserResponse, addUserError } = useSelector(
    (state) => state.addUser
  );
  const { getCompaniesLoading, getCompaniesResponse, getCompaniesError } =
    useSelector((state) => state.getCompanies);

  const currentCompany =
    !getCompaniesLoading &&
    getCompaniesResponse &&
    getCompaniesResponse.length > 0 &&
    getCompaniesResponse[
      getCompaniesResponse.map((company) => company.id).indexOf(companyId)
    ];

  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    company: currentCompany && currentCompany.get("name"),
    designation: "",
    role: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: userSchema,
      onSubmit: (values, action) => {
        dispatch(createUser(values));
      },
    });

  useEffect(() => {
    if (!addUserLoading && addUserResponse && addUserResponse.user.uid) {
      setAlertOpen(true);
      setAlertMessage("User Added");
      setAlertSeverity("success");
    }
    if (!addUserLoading && addUserError) {
      setAlertOpen(true);
      setAlertMessage(
        addUserError === "auth/email-already-in-use"
          ? "Email is already registered"
          : "Something Went Wrong!"
      );
      setAlertSeverity("error");
    }
    dispatch({ type: AdminConstants.ADD_USER_RESET_STATE });
  }, [dispatch, addUserResponse, addUserError]);

  return (
    <Page title="Create User">
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
          Create User
        </Typography>
      </Container>
      <Container>
        <Card variant="outlined" sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h4" sx={{ m: 1 }}>
              Personal Details
            </Typography>
            <Grid container>
              <Grid sm={12} lg={6} md={6}>
                <Box sx={{ m: 2 }}>
                  <FormControl fullWidth>
                    <TextField
                      variant="outlined"
                      label="User Name"
                      id="name"
                      name="name"
                      placeholder="Enter User Name"
                      value={values.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.name && errors.name}
                      helperText={touched.name && errors.name && errors.name}
                    />
                  </FormControl>
                </Box>
                <Box sx={{ m: 2 }}>
                  <FormControl fullWidth>
                    <TextField
                      variant="outlined"
                      label="Email"
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter Email"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.email && errors.email}
                      helperText={touched.email && errors.email && errors.email}
                    />
                  </FormControl>
                </Box>
              </Grid>

              <Grid sm={12} lg={6} md={6}>
                <Box sx={{ m: 2 }}>
                  <FormControl fullWidth>
                    <TextField
                      variant="outlined"
                      label="Mobile Number"
                      placeholder="Enter Mobile Number"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={values.phoneNumber}
                      onBlur={handleBlur}
                      onChange={handleChange}
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
                    <TextField
                      multiline
                      rows={3}
                      variant="outlined"
                      label="Address"
                      id="address"
                      name="address"
                      placeholder="Enter Address"
                      value={values.address}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.address && errors.address}
                      helperText={
                        touched.address && errors.address && errors.address
                      }
                    />
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <Divider />
            </Box>
            <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
              Company Details
            </Typography>
            <Grid container>
              <Grid sm={12} lg={6} md={6}>
                <Box sx={{ m: 2 }}>
                  <Card variant="outlined" sx={{ p: 2, borderRadius: 1 }}>
                    <Typography>
                      <b>Company Name{" : "}</b>
                      {currentCompany &&
                        currentCompany.get("name").toUpperCase()}
                    </Typography>
                  </Card>
                </Box>
                <Box sx={{ m: 2 }}>
                  <FormControl fullWidth>
                    <TextField
                      variant="outlined"
                      label="Designation"
                      id="designation"
                      name="designation"
                      placeholder="Enter Designation"
                      value={values.designation}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.designation && errors.designation}
                      helperText={
                        touched.designation &&
                        errors.designation &&
                        errors.designation
                      }
                    />
                  </FormControl>
                </Box>
              </Grid>

              <Grid sm={12} lg={6} md={6}>
                <Box sx={{ m: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="user-role"
                      sx={{ color: touched.role && errors.role && "red" }}
                    >
                      Role
                    </InputLabel>
                    <Select
                      labelId="user-role"
                      id="role"
                      label="Role"
                      name="role"
                      value={values.role}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.role && errors.role}
                    >
                      <MenuItem value="Manager">Manager</MenuItem>
                      <MenuItem value="Developer">Developer</MenuItem>
                    </Select>
                    <FormHelperText sx={{ color: "red" }}>
                      {touched.role && errors.role}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ m: 5, textAlign: "center" }}>
              <LoadingButton
                variant="outlined"
                size="large"
                type="submit"
                loading={addUserLoading}
              >
                Submit
              </LoadingButton>
              <Box sx={{ m: 5 }}>
                {addUserResponse && addUserResponse.user.uid && (
                  <Typography sx={{ color: "green" }}>
                    User created Successfully
                  </Typography>
                )}
              </Box>
              <Box sx={{ m: 5 }}>
                {addUserError && (
                  <Typography sx={{ color: "red" }}>{addUserError}</Typography>
                )}
              </Box>
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

export default CreateClientUser;
