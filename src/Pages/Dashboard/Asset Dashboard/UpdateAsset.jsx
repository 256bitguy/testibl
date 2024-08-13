import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { jobStatusList, AssetTypes } from "../../../Utils/Data/AppData";
import { updateAsset } from "../../../Redux/Actions/AdminActions";
import { assetSchema } from "../../../Schemas/assetSchema";
import { storage } from "../../../Utils/Configs/FirebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { FaCheck } from "react-icons/fa";
import LoadingButton from "@mui/lab/LoadingButton";
import * as AdminConstants from "../../../Redux/Constants/AdminConstants";
import CustomSnackbar from "../../../Utils/Layouts/CustomSnackbar";
import Breadcrumb from "../../../Components/Breadcrumb";

const UpdateAsset = () => {
  const dispatch = useDispatch();

  const fileTypes = ["image/png", "image/jpeg"];

  const { assetId } = useParams();

  const [imageDetails, setImageDetails] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const {
    getCompanyAssetsLoading,
    getCompanyAssetsResponse,
    getCompanyAssetsError,
    updateResponse,
  } = useSelector((state) => state.getCompanyAssets);

  const currentAsset =
    !getCompanyAssetsLoading &&
    getCompanyAssetsResponse &&
    getCompanyAssetsResponse.length > 0 &&
    getCompanyAssetsResponse[
      getCompanyAssetsResponse.map((asset) => asset.id).indexOf(assetId)
    ];

  const [images, setImages] = useState(
    (currentAsset && currentAsset.get("images")) || []
  );

  const initialValues = {
    name: (currentAsset && currentAsset.get("name")) || "",
    type: (currentAsset && currentAsset.get("type")) || "",
    serviceEngineer:
      (currentAsset && currentAsset.get("serviceEngineer")) || "",
    requestedDeliveryDate:
      (currentAsset && currentAsset.get("requestedDeliveryDate")) || "",
    promisedDeliveryDate:
      (currentAsset && currentAsset.get("promisedDeliveryDate")) || "",
    jobQueuedNumber:
      (currentAsset && currentAsset.get("jobQueuedNumber")) || "",
    jobStatus: (currentAsset && currentAsset.get("jobStatus")) || "",
    images: [],
    description: (currentAsset && currentAsset.get("description")) || "",
    assetId: assetId,
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: assetSchema,
      onSubmit: (values, action) => {
        dispatch(updateAsset(values));
      },
    });

  useEffect(() => {
    if (
      !getCompanyAssetsLoading &&
      getCompanyAssetsResponse &&
      updateResponse
    ) {
      setAlertOpen(true);
      setAlertMessage("Asset Updated");
      setAlertSeverity("success");
      dispatch({ type: AdminConstants.GET_COMPANY_ASSETS_RESET_STATE });
    }
  }, [dispatch, getCompanyAssetsResponse, updateResponse]);

  const handleRemoveImage = (e, image) => {
    e.preventDefault();
    let images = [...imageDetails];
    var index = images.indexOf(image);
    images.splice(index, 1);
    setImageDetails(images);
  };

  const handleUploadImages = (e) => {
    e.preventDefault();
    let images = [...imageDetails];
    for (let i = 0; i <= images.length; i++) {
      if (!images[i].image) return;
      const storageRef = ref(storage, `/Spare Files/${images[i].image.name}`);
      const uploadInfo = uploadBytesResumable(storageRef, images[i].image);

      uploadInfo.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          let imagesDetail = [...imageDetails];

          imagesDetail[i].imageUploadProgress = progress;
          setImageDetails(imagesDetail);
        },
        (error) => console.log(error),
        () => {
          getDownloadURL(uploadInfo.snapshot.ref).then((url) => {
            values.images[i].url = url;
          });
        }
      );
    }
  };

  const handleDeleteImage = (image) => {
    let images_temp = [...images];
    var index = images_temp.indexOf(image);
    images_temp.splice(index, 1);
    setImages(images_temp);
  };

  return (
    <Page title="Update Asset">
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
          {
            name: "Asset Profile",
            link: `/asset-profile/${assetId}`,
          },
        ]}
        activePage={"Update Asset"}
      />
      <Container>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Update Asset
        </Typography>
      </Container>
      <Container>
        <Card variant="outlined" sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h4" sx={{ m: 1 }}>
              Asset Details
            </Typography>

            <Grid container>
              <Grid sm={12} lg={6} md={6}>
                <Box sx={{ m: 2 }}>
                  <FormControl fullWidth>
                    <TextField
                      variant="outlined"
                      label="Asset Name"
                      placeholder="Enter Asset Name"
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
                      label="Service Engineer"
                      placeholder="Enter Service Engineer"
                      name="serviceEngineer"
                      value={values.serviceEngineer}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.serviceEngineer && errors.serviceEngineer}
                      helperText={
                        touched.serviceEngineer &&
                        errors.serviceEngineer &&
                        errors.serviceEngineer
                      }
                    />
                  </FormControl>
                </Box>
                <Box sx={{ m: 2 }}>
                  <FormControl fullWidth>
                    <TextField
                      type="date"
                      name="requestedDeliveryDate"
                      label="Requested Delivery Date"
                      value={values.requestedDeliveryDate}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        touched.requestedDeliveryDate &&
                        errors.requestedDeliveryDate
                      }
                      helperText={
                        touched.requestedDeliveryDate &&
                        errors.requestedDeliveryDate &&
                        errors.requestedDeliveryDate
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                </Box>
                <Box sx={{ m: 2 }}>
                  <FormControl fullWidth>
                    <TextField
                      type="number"
                      variant="outlined"
                      label="Job Queued Number"
                      placeholder="Enter Job Queued Number"
                      name="jobQueuedNumber"
                      value={values.jobQueuedNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.jobQueuedNumber && errors.jobQueuedNumber}
                      helperText={
                        touched.jobQueuedNumber &&
                        errors.jobQueuedNumber &&
                        errors.jobQueuedNumber
                      }
                    />
                  </FormControl>
                </Box>
              </Grid>

              <Grid sm={12} lg={6} md={6}>
                <Box sx={{ m: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="asset-type"
                      sx={{
                        color: touched.type && errors.type && "red",
                      }}
                    >
                      Asset Type
                    </InputLabel>
                    <Select
                      labelId="asset-type"
                      id="type"
                      label="Asset Type"
                      name="type"
                      value={values.type}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.type && errors.type}
                    >
                      {AssetTypes.map((type) => (
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
                      inputProps={{ multiple: true }}
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files.length > 0) {
                          var images = [];
                          for (var i = 0; i < files.length; i++) {
                            if (fileTypes.includes(files[i].type)) {
                              images.push({
                                image: files[i],
                                imageLocalUrl: URL.createObjectURL(files[i]),
                                imageUploadProgress: 0,
                              });
                              values.images.push({
                                name: files[i].name,
                                url: "",
                              });
                            } else {
                              alert("Image should be in png/jpg format");
                              setImageDetails([]);
                              return;
                            }
                          }
                          setImageDetails(images);
                        }
                      }}
                    />
                    {images.length > 0 &&
                      images.map((image) => (
                        <Box sx={{ m: 1 }}>
                          <a href={image.url} target="_blank">
                            {image.name}
                          </a>

                          <Button onClick={() => handleDeleteImage(image)}>
                            <Iconify
                              icon="fluent:delete-20-filled"
                              color="red"
                              fontSize={20}
                            />
                          </Button>
                        </Box>
                      ))}
                  </FormControl>
                  <Grid container>
                    {imageDetails.map((image) => (
                      <Grid>
                        <img
                          src={image.imageLocalUrl}
                          alt="spare"
                          style={{ height: 100, width: 100, margin: 10 }}
                        />
                        {image.imageUploadProgress !== 0 &&
                          image.imageUploadProgress !== 100 && (
                            <Button>
                              Uploading {image.imageUploadProgress}%
                            </Button>
                          )}
                        {image.imageUploadProgress === 0 && (
                          <>
                            <Button
                              color="success"
                              onClick={handleUploadImages}
                            >
                              Upload
                            </Button>
                            <Button
                              color="error"
                              onClick={(e) => handleRemoveImage(e, image)}
                            >
                              Remove
                            </Button>
                          </>
                        )}
                        {image.imageUploadProgress === 100 && (
                          <Button color="success" endIcon={<FaCheck />}>
                            Uploaded
                          </Button>
                        )}
                      </Grid>
                    ))}
                  </Grid>
                </Box>
                <Box sx={{ m: 2 }}>
                  <FormControl fullWidth>
                    <TextField
                      type="date"
                      name="promisedDeliveryDate"
                      label="Promised Delivery Date"
                      value={values.promisedDeliveryDate}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        touched.promisedDeliveryDate &&
                        errors.promisedDeliveryDate
                      }
                      helperText={
                        touched.promisedDeliveryDate &&
                        errors.promisedDeliveryDate &&
                        errors.promisedDeliveryDate
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                </Box>
                <Box sx={{ m: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="job-status"
                      sx={{
                        color: touched.jobStatus && errors.jobStatus && "red",
                      }}
                    >
                      Job Status
                    </InputLabel>
                    <Select
                      labelId="job-status"
                      id="jobStatus"
                      label="Asset Type"
                      name="jobStatus"
                      value={values.jobStatus}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.jobStatus && errors.jobStatus}
                    >
                      {jobStatusList.map((jobStatus) => (
                        <MenuItem value={jobStatus}>{jobStatus}</MenuItem>
                      ))}
                    </Select>
                    <FormHelperText sx={{ color: "red" }}>
                      {touched.jobStatus &&
                        errors.jobStatus &&
                        errors.jobStatus}
                    </FormHelperText>
                  </FormControl>
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
                  label="Asset Description"
                  placeholder="Enter Asset Description"
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
                loading={getCompanyAssetsLoading}
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

export default UpdateAsset;