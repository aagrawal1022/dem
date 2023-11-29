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
import { RootState } from "store/store";
import { store } from "store/store";
import { login as userLogin } from "store/slices/authSlice";
import { useNavigate } from 'react-router-dom';
import { dummyUser } from "utils/types/user";

export const Login: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    console.log('trying to login');
    e.preventDefault();
    store.dispatch(userLogin(dummyUser));
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
              onSubmit={handleSubmit}
              style={{ width: "100%", marginTop: "20px" }}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
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
