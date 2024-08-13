import { Card, Container, Typography, Grid, Box } from "@mui/material";

import LoginForm from "../../Components/LoginForm";
import "./login.css";

export default function Login() {
  return (
    <Grid container>
      <Grid lg={9} md={6} className="welcomeInfo">
        <Card style={{ margin: 5, height: "100%", backgroundColor: "skyblue" }}>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            IBL
          </Typography>
        </Card>
      </Grid>
      <Grid lg={3} md={6} sm={12} container display={{ display: "grid" }}>
        <Typography variant="h2" sx={{ margin: 2, textAlign: "center" }}>
          IBL Logo
        </Typography>
        <Container>
          <Typography variant="h4">Sign in to IBL</Typography>

          <Typography sx={{ color: "text.secondary", mb: 5 }}>
            Enter your details below.
          </Typography>
          <Box sx={{}}>
            <LoginForm />
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}
