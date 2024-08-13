import {
  Stack,
  Button,
  Container,
  Grid,
  FormControl,
  TextField,
  Box,
} from "@mui/material";
import React from "react";
import Page from "../../../Components/Page";
import Iconify from "../../../Utils/Layouts/Iconify";
import Scrollbar from "../../../Components/Scrollbar";
import { Link } from "react-router-dom";
import ClientUsersTable from "../../../Components/ClientUsers/ClientUsersTable";

const ClientUserDashboard = ({ companyId, clientUsers }) => {
  return (
    <Container>
      <Grid container columnSpacing={2}>
        <Grid item xs={10}>
          <FormControl fullWidth>
            <TextField placeholder="Search user" type="text" size="medium" />
          </FormControl>
        </Grid>

        <Grid item xs={2}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Link to={`/create-client-user/${companyId}`}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                New User
              </Button>
            </Link>
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 5 }}>
        <ClientUsersTable usersIds={clientUsers} />
      </Box>
    </Container>
  );
};

export default ClientUserDashboard;
