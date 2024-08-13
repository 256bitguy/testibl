import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";

import {
  TextField,
  Stack,
  InputAdornment,
  IconButton,
  Box,
  FormControl,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Iconify from "../Utils/Layouts/Iconify";
import { loginSchema } from "../Schemas/loginSchema";
import { UserLogin } from "../Redux/Actions/AuthActions";
import CustomSnackbar from "../Utils/Layouts/CustomSnackbar";

export default function LoginForm() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const { userLoading, authResponse, authError } = useSelector(
    (state) => state.user
  );

  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        dispatch(UserLogin(values));
      },
    });

  useEffect(() => {
    if (!userLoading && authError) {
      console.log("here");
      if (authError === "auth/user-not-found") {
        setAlertOpen(true);
        setAlertMessage("User is not registered");
        setAlertSeverity("error");
      } else if (authError === "auth/wrong-password") {
        setAlertOpen(true);
        setAlertMessage("Incorrect Password");
        setAlertSeverity("error");
      }
    }
    if (!userLoading && authResponse && authResponse.user.uid) {
      setAlertOpen(true);
      setAlertMessage("Login Successful");
      setAlertSeverity("success");
    }
  }, [dispatch, userLoading, authResponse, authError]);

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <FormControl fullWidth>
          <TextField
            id="email"
            name="email"
            label="Email"
            placeholder="Enter Email Address"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.email && errors.email}
            helperText={touched.email && errors.email && errors.email}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="password"
            name="password"
            label="Password"
            placeholder="Enter Password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={touched.password && errors.password}
            helperText={touched.password && errors.password && errors.password}
          />
        </FormControl>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        {/* <Checkbox name="remember" label="Remember me" /> */}
        <Link
          to=""
          variant="subtitle2"
          underline="hover"
          style={{ textDecoration: "none" }}
        >
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ my: 2 }}
        loading={userLoading}
      >
        Login
      </LoadingButton>
      <CustomSnackbar
        open={alertOpen}
        message={alertMessage}
        severity={alertSeverity}
        handleClose={() => setAlertOpen(false)}
      />
    </form>
  );
}
