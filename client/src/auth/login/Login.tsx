import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { NavigationBar } from "shared/NavigationBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "store/store";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginDetailsDto } from "./components/Login.constant";
import { client } from "config/apollo.config";
import { authGqls } from "auth/Auth.gqls";
import { login as userLogin } from "store/slices/authSlice";

export const Login: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDetailsDto>();
  const navigate = useNavigate();

  const onSubmit = async (formData: LoginDetailsDto) => {
    const result = await client.query({
      query: authGqls.queries.loginUser,
      variables: {
        userLoginDetails: formData,
      },
    });
    store.dispatch(userLogin(result.data.loginUser));
    navigate('/add-expense');
  };

  return (
    !isLoggedIn && (
      <div>
        <Container
          component="main"
          maxWidth="xs"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Paper
            elevation={3}
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ width: "100%", marginTop: "20px" }}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="email"
                name="email"
                autoComplete="email"
                {...register("email", { required: "Email is required" })}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", { required: "Password is required" })}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
              >
                Sign In
              </Button>
            </form>
          </Paper>
        </Container>
      </div>
    )
  );
};

