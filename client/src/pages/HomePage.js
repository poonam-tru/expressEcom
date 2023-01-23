import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { CssBaseline } from "@mui/material";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchValidateUser, logoutValidateUser } from "../actions/user";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  // const getUser = localStorage.getItem("user");
  const [username, setUsername] = useState("");
  // console.log(getUser, "user");
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    dispatch(fetchValidateUser(data));
    setUsername(localStorage.getItem("user"));
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutValidateUser());
    setUsername("");
  };

  useEffect(() => {}, [username]);

  return (
    <div>
      <h2>{username && `Hi, ${username}.`} Welcome To HomePage</h2>
      {username ? (
        <Button onClick={handleLogout}>Logout</Button>
      ) : (
        <Button onClick={handleOpen}>Sign In</Button>
      )}

      <Link to="/allprd">
        <Button>All Products</Button>
      </Link>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                // width: 400,
                height: 370,
                marginTop: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "20px",
              }}
            >
              <Typography component="h1" variant="h5">
                Sign
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="off"
                  autoFocus
                  {...register("email", { required: true })}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...register("password", { required: true })}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  LogIn
                </Button>

                <Grid container>
                  <Grid item>
                    <Grid item>"Don't have an account?</Grid>
                    <Link to="/signup" variant="body2">
                      {"Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
