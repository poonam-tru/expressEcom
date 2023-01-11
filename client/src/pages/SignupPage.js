import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { CssBaseline } from "@mui/material";
import { ActionType } from "../actions/actionType";
import { useDispatch } from "react-redux";
import { createNewUser } from "../actions/user";
function SignupPage() {
  //   const [userDetail, setUserDetail] = useState("");
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data, "my data submited");
    dispatch(createNewUser(data));
    // console.log(data);
    // reset();
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            height: 500,
            backgroundColor: "#dddddd",
            borderRadius: "20px",
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "40px",
            justifyContent: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
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
              id="username"
              label="Username"
              name="username"
              autoComplete="off"
              autoFocus
              {...register("username", { required: true })}
            />
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
              id="number"
              label="Contact No."
              name="contact"
              autoComplete="off"
              autoFocus
              {...register("contact", { required: true })}
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
              Create Account
            </Button>

            {/* <Grid container>
                    <Grid item>
                        <Grid item>
                        "Don't have an account?
                        </Grid>
                        <Link to="/signup" variant="body2">
                        {"Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
             */}
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default SignupPage;
