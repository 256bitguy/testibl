import React from "react";
import Breadcrumb from "../../../../Components/Breadcrumb";

const UpdateAssetSpare = () => {
  return (
    <Page title="Update Spare">
      <Breadcrumb
        prevPagesList={[
          { name: "Dashboard", link: "/admin-dashboard" },
          { name: "Company Dashboard", link: "/company-dashboard" },
          {
            name: "Asset Profile",
            link: `/asset-profile/${assetId}`,
          },
        ]}
        activePage={"Update Spare"}
      />
      <Container>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Update Spare
        </Typography>
      </Container>
      <Container>
        <Card variant="outlined" sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
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

export default UpdateAssetSpare;
