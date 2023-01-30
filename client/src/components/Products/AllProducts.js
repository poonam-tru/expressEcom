import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsData } from "../../actions/products";
import products from '../../API/allproducts.json'
import category from '../../API/category.json'

import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
export default function Allproducts() {
  const dispatch = useDispatch();
  // const products = useSelector((state) => state.allProducts.products);
  React.useEffect(() => {
    dispatch(getAllProductsData());
  }, [dispatch]);

  return (
    <>
     <Box sx={{ flexGrow: 1 }} style={{backgroundColor:'#f6f9fc'}}>
      <Typography style={{fontSize:'25px',fontWeight:'bolder',padding:'2rem 0rem 1rem',textAlign:'center'}}>All Products</Typography>
      <Grid container spacing={2} style={{padding:'1rem 0rem 2rem 5rem'}}>
        <Grid item xs={3}>
        <Box sx={{ width: '100%', maxWidth: 360 }}>
          <nav aria-label="secondary mailbox folders">
          <Typography style={{fontSize:'20px',fontWeight:'bolder',padding:'1rem 0rem'}}>Categories</Typography>
            <List>
              {category.map((i)=>
                <ListItem disablePadding>
                  <ListItemAvatar>
                    <Avatar style={{width:'33px',height:'33px'}}>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemButton style={{paddingLeft:'0px'}}>
                    <ListItemText primary={i.catg} />
                  </ListItemButton>
                </ListItem>
              )}
            </List>
          </nav>
        </Box>
        </Grid>
        <Grid item xs={9}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              {products.map((product) => (
                <Grid key={product.sku_id} item padding="20px">
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/singleprd/${product.sku_id}`}
                  >
                    <Paper
                      sx={{
                        // height: 230,
                        width: 230,
                        textAlign: "center",
                        borderRadius:'10px',
                        backgroundColor: (theme) =>
                          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                      }}>
                        <h3 style={{ margin: 0 , padding: '14px 0px' , borderBottom: '1px solid #ddd'}}>{product.prdName}</h3>
                        <img alt='' style={{ display: 'block', width: '100%' , borderRadius:" 0px 0px 10px 10px"}} src={product.img}/>

                    </Paper>
                  </Link>
                </Grid>
              ))}
            </Grid>
        </Grid>
        </Grid>
      </Grid>
      </Grid>
    </Box>
    
    </>
  );
}
