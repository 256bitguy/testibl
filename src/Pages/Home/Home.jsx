import { Grid, Container, Typography } from "@mui/material";

import Page from "../../Components/Page";

export default function Home() {
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
         Welcome to the literary club
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}></Grid>

          <Grid item xs={12} sm={6} md={3}></Grid>

          <Grid item xs={12} sm={6} md={3}></Grid>

          <Grid item xs={12} sm={6} md={3}></Grid>

          <Grid item xs={12} md={6} lg={8}></Grid>

          <Grid item xs={12} md={6} lg={4}></Grid>

          <Grid item xs={12} md={6} lg={8}></Grid>

          <Grid item xs={12} md={6} lg={4}></Grid>

          <Grid item xs={12} md={6} lg={8}></Grid>

          <Grid item xs={12} md={6} lg={4}></Grid>

          <Grid item xs={12} md={6} lg={4}></Grid>

          <Grid item xs={12} md={6} lg={8}></Grid>
        </Grid>
      </Container>
    </Page>
  );
}
