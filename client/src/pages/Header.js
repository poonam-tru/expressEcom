import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";

import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { CssBaseline, Grid, Modal } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css'

import { useDispatch, useSelector } from "react-redux";
import { fetchValidateUser, logoutValidateUser } from "../actions/user";
import { getUserCred } from "../utils/helpers";

function Header() {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '15px',
    boxShadow: 24,
    p: 3,
    height:'auto'
  }

  const [open, setOpen] = useState(false);
  const username = getUserCred();
  // console.log(username, "setup");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    dispatch(fetchValidateUser(data, navigate));
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutValidateUser(navigate));

  };

  return (
    <div>
    {/* <img src={landingPage} alt=''/> */}
    <div className="header_style">
        <Link to='/products'>
          <Button>All Products</Button>
        </Link>
        {username ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Button onClick={handleOpen}>Sign In</Button>
        )}
    </div>

      {/* <h2 className='home_page_head'>{username && `Hi, ${username}.`} Welcome To HomePage</h2> */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                // width: 400,
                height: 'auto',
                marginTop: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "20px",
              }}
            >
              <Typography component="h1" variant="h5" style={{fontSize:'24px'}}>
                Sign In
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
                  label="Email"
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
                 Sign In
                </Button>

                <Grid container style={{padding:'15px 0px 0px'}}>
                  <Grid item>
                      <Grid item style={{fontSize:'17px'}}>
                        Don't have an account?
                            <Link to="/signup" variant="body2" style={{paddingLeft:'8px'}}>
                            {"Sign Up"}
                            </Link>
                      </Grid>
                  </Grid>
                </Grid>

                <Grid container style={{padding:'15px 0px 15px'}}>
                    <Grid item>
                        <Grid item style={{fontSize:'17px'}}>
                        Forgot your password?
                            <Link to="/reset" variant="body2" style={{paddingLeft:'8px'}}>
                            {"Reset It"}
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
  );
}

export default Header;
