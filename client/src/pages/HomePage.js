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

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '15px',
    boxShadow: 24,
    p: 4,
  }

  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    dispatch(fetchValidateUser(data));
    reset();
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

<Box sx={style}>

      <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                // width: 400,
                height: 458,
                marginTop: 0,
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
            </Box>
        </Modal>
    </div>
  )
}

export default HomePage