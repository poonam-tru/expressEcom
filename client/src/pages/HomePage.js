import React, { useState,useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';


import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { CssBaseline, Grid, Modal } from '@mui/material';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { fetchValidateUser, logoutValidateUser } from "../actions/user";

function HomePage() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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

        <Link to='/allprd'>
            <Button>All Products</Button>
        </Link>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    // height: 470,
                    backgroundColor: 'white',
                    borderRadius:"10px",
                    marginTop: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding:"40px",
                    justifyContent:"center"
                }}
                >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="off"
                autoFocus
                {...register("username", { required: true})}
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
                {...register("email", { required: true})}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                id="number"
                label="Contact No."
                name="number"
                autoComplete="off"
                autoFocus
                {...register("number", { required: true})}
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
                {...register("password", { required: true})}
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >Create Account</Button>

                <Grid container>
                    <Grid item>
                        <Grid item>
                        "Don't have an account?
                            <Link to="/signup" variant="body2">
                            {"Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>

                </Box>
            </Box>
            </Container>
        </Modal>
    </div>
  )
}

export default HomePage