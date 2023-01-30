import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Grid, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// const bull = (
//   <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//   >
//     •
//   </Box>
// );

export default function ResetPage() {
  return (
    <Card sx={{ maxWidth: 470, width:'100%', margin:'auto',marginTop:'8rem',padding:'0px 40px' }}>
      <CardContent>
      <Typography style={{textAlign:'center',padding:'1rem 0rem 2rem',fontSize:'22px'}}>
      Reset your password
      </Typography>

      <TextField 
        fullWidth
        required
        id="email"
        label="Email"
        name="email"
        size="small"
        autoComplete="off"
        />

      </CardContent>
      <CardActions style={{justifyContent:'center'}}>
        <Button variant="contained" style={{width:'100%'}}>Reset</Button>
      </CardActions>

      <CardActions>
        <Grid container style={{padding:'15px 0px 20px',justifyContent:'center'}}>
            <Grid item>
                <Grid item style={{fontSize:'16px'}}>
                Don't have an account?
                    <Link to="/signup" variant="body2" style={{paddingLeft:'8px'}}>
                    {"Sign Up"}
                    </Link>
                </Grid>
            </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}