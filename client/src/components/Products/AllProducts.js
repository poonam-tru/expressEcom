import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import allprd from '../../API/allproducts.json'
import { Link } from 'react-router-dom';

export default function Allproducts() {

  return (
    <Grid sx={{ flexGrow: 1 }} container >
      <Grid item xs={12}>
        <Grid container justifyContent="center">
        {allprd.map((u)=>
            <Grid key={u.id} item padding="20px">
              <Link style={{textDecoration : 'none'}} to={`/singleprd/${u.id}`}>
                <Paper
                  sx={{
                    // height: 230,
                    width: 200,
                    textAlign:"center",
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                  }}>
                    <h3 style={{ margin: 0 , padding: '10px 0px' , borderBottom: '1px solid #ddd'}}>{u.prdName}</h3>
                    <img style={{ display: 'block', width: '100%' , borderRadius:"20px"}} src={u.img}/>

                </Paper>
              </Link>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
