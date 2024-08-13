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
import Page from "../../../Components/Page";
import Iconify from "../../../Utils/Layouts/Iconify";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { SpareTypes } from "../../../Utils/Data/AppData";
import { addSpare } from "../../../Redux/Actions/AdminActions";
import { spareSchema } from "../../../Schemas/spareSchema";
import { storage } from "../../../Utils/Configs/FirebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { FaCheck } from "react-icons/fa";
import LoadingButton from "@mui/lab/LoadingButton";
import * as AdminConstants from "../../../Redux/Constants/AdminConstants";
import CustomSnackbar from "../../../Utils/Layouts/CustomSnackbar";
import Breadcrumb from "../../../Components/Breadcrumb";

const AddSpare = () => {
  const dispatch = useDispatch();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const [imageDetails, setImageDetails] = useState({
    image: null,
    imageLocalUrl: "",
    imageUploadProgress: 0,
  });

  const fileTypes = ["image/png", "image/jpeg"];

  const { addSpareLoading, addSpareResponse, addSpareError } = useSelector(
    (state) => state.addSpare
  );

  const initialValues = {
    name: "",
    type: "",
    price: "",
    imageUrl: "",
    imageName: "",
    description: "",
    assetId: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: spareSchema,
      onSubmit: async (values, action) => {
        dispatch(addSpare(values));
      },
    });

  useEffect(() => {
    if (!addSpareLoading && addSpareResponse) {
      setAlertOpen(true);
      setAlertMessage("Spare Added");
      setAlertSeverity("success");
      values.name = "";
      values.type = "";
      values.price = "";
      values.imageUrl = "";
      values.imageName = "";
      values.description = "";
      values.assetId = "";
      setImageDetails({
        image: null,
        imageLocalUrl: "",
        imageUploadProgress: 0,
      });
      dispatch({ type: AdminConstants.ADD_SPARE_RESET_STATE });
    }
    if (!addSpareLoading && addSpareError) {
      setAlertOpen(true);
      setAlertMessage(addSpareError);
      setAlertSeverity("error");
      dispatch({ type: AdminConstants.ADD_SPARE_RESET_STATE });
    }
  }, [dispatch, addSpareResponse, addSpareError]);

  const handleUploadImage = (e) => {
    e.preventDefault();
    const { image } = imageDetails;
    if (!image) return;
    const storageRef = ref(storage, `/Spare Files/${image.name}`);
    const uploadInfo = uploadBytesResumable(storageRef, image);

    uploadInfo.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setImageDetails({ ...imageDetails, imageUploadProgress: progress });
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadInfo.snapshot.ref).then((url) => {
          values.imageUrl = url;
        });
      }
    );
  };

  return (
    <Page title="Add Spare">
      <Breadcrumb
        prevPagesList={[
          { name: "Dashboard", link: "/admin-dashboard" },
          { name: "Spare Dashboard", link: "/spare-dashboard" },
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
              Spare Details
            </Typography>

            <Grid container>
              <Grid sm={12} lg={6} md={6}>
                <Box sx={{ m: 2 }}>
                  <FormControl fullWidth>
                    <TextField
                      variant="outlined"
                      label="Spare Name"
                      placeholder="Enter Spare Name"
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
                    <TextField
                      variant="outlined"
                      label="Spare Price"
                      placeholder="Enter Spare Price"
                      name="price"
                      type="number"
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.price && errors.price}
                      helperText={touched.price && errors.price && errors.price}
                    />
                  </FormControl>
                </Box>
              </Grid>

              <Grid sm={12} lg={6} md={6}>
                <Box sx={{ m: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="spare-type"
                      sx={{
                        color: touched.type && errors.type && "red",
                      }}
                    >
                      Spare Type
                    </InputLabel>
                    <Select
                      labelId="spare-type"
                      id="type"
                      label="Spare Type"
                      name="type"
                      value={values.type}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.type && errors.type}
                    >
                      {SpareTypes.map((type) => (
                        <MenuItem value={type}>{type}</MenuItem>
                      ))}
                    </Select>
                    <FormHelperText sx={{ color: "red" }}>
                      {touched.type && errors.type && errors.type}
                    </FormHelperText>
                  </FormControl>
                </Box>
                <Box sx={{ m: 2 }}>
                  <FormControl fullWidth>
                    <TextField
                      type="file"
                      variant="outlined"
                      name="image"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          if (fileTypes.includes(e.target.files[0].type)) {
                            setImageDetails({
                              ...imageDetails,
                              image: e.target.files[0],
                              imageLocalUrl: URL.createObjectURL(
                                e.target.files[0]
                              ),
                            });

                            values.imageName = e.target.files[0].name;
                          } else {
                            alert("Image should be in jpg/png format");
                          }
                        }
                      }}
                    />
                  </FormControl>
                  {imageDetails.image && imageDetails.imageLocalUrl && (
                    <Box>
                      <img
                        src={imageDetails.imageLocalUrl}
                        alt="asset"
                        style={{ height: 100, width: 100 }}
                      />
                      {imageDetails.imageUploadProgress !== 0 &&
                        imageDetails.imageUploadProgress !== 100 && (
                          <Button>
                            Uploading {imageDetails.imageUploadProgress}%
                          </Button>
                        )}
                      {imageDetails.imageUploadProgress === 0 && (
                        <>
                          <Button color="success" onClick={handleUploadImage}>
                            Upload
                          </Button>
                          <Button
                            color="error"
                            onClick={() => {
                              setImageDetails({
                                image: null,
                                imageLocalUrl: "",
                                imageUploadProgress: 0,
                              });
                              values.imageName = "";
                            }}
                          >
                            Remove
                          </Button>
                        </>
                      )}
                      {imageDetails.imageUploadProgress === 100 && (
                        <Button color="success" endIcon={<FaCheck />}>
                          Uploaded
                        </Button>
                      )}
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>

            <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
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
                loading={addSpareLoading}
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

export default AddSpare;
