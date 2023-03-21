import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsData } from "../../actions/products";
import { getCategoriesData } from "../../actions/categories";
// import products from '../../API/allproducts.json'
// import category from '../../API/category.json'
import defaultImg from '../../images/img_4.png'
import '../../pages/HomePage.css'

import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import Header from "../../pages/Header";
function AllProducts() {
  const [catg,setCatg] = React.useState()
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts.products);
  const categories = useSelector((state) => state.categoriesReducer.catg);
  // console.log(categories,"catge------")

  React.useEffect(() => {
    dispatch(getCategoriesData());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getAllProductsData());
  }, [dispatch]);

  const handleCatg = (i) => {
    setCatg(i)
    console.log(i,"iii=======")
  }

  return (
    <>
    <Header />
    {/* <Box sx={{ flexGrow: 1 }} style={{backgroundColor:'#f6f9fc',height:'90vh'}}> */}
      {/* <Typography>All Products</Typography> */}
      <Grid container spacing={2} style={{backgroundColor:'#f6f9fc',padding:'0rem 0rem 2rem 5rem',marginTop:'0.1rem',height:'90vh'}}>
        <Grid item xs={2.5} style={{backgroundColor:'white',borderRadius:'10px',marginTop:'1rem',paddingLeft:'3rem'}}>
        <Box sx={{ width: '100%', maxWidth: 360 }}>
          <nav aria-label="secondary mailbox folders">
          <Typography style={{fontSize:'23px',fontWeight:'bolder',padding:'1rem 0rem 1rem'}}>Categories</Typography>

          {/* <Typography style={{fontSize:'20px',fontWeight:'bolder',padding:'1rem 0rem'}}>Categories</Typography> */}
            <List>
              {categories.map((i,j)=>
                <ListItem disablePadding key={j} onClick={()=>handleCatg(i.cat_id)}>
                    <i className="fa fa-user-circle" aria-hidden="true"></i>
                  <ListItemButton style={{paddingLeft:'0px'}}>
                    <ListItemText primary={i.cat_name} />
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

            <Typography style={{fontSize:'23px',fontWeight:'bolder',padding:'1rem 2rem 0rem'}}>All Products</Typography>
            <Typography style={{fontSize:'14px',padding:'0.4rem 2rem 0rem'}}>Best collection in 2021 for you!</Typography>
            <div  className={catg ? 'dly_none' :'dly_blk'}>
              <Grid container>
                {products.map((product,ind) => (
                  <Grid key={ind} item padding="20px">
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/product/${product.sku_id}`}
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
                          <img alt='defaultImg' style={{ display: 'block', width: '100%' , borderRadius:" 0px 0px 10px 10px"}} src={defaultImg}/>
                          <h3 style={{ margin: 0 , padding: '14px 0px' , borderTop: '1px solid #ddd'}}>{product.name}</h3>

                      </Paper>
                    </Link>
                  </Grid>
                ))}
              </Grid>
              </div>

              <Grid container>
                {products.filter((itm=> itm.sku_id === catg )).map((product,ind) => (
                  <Grid key={ind} item padding="20px">
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/product/${product.sku_id}`}
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
                          <img alt='defaultImg' style={{ display: 'block', width: '100%' , borderRadius:" 0px 0px 10px 10px"}} src={defaultImg}/>
                          <h3 style={{ margin: 0 , padding: '14px 0px' , borderTop: '1px solid #ddd'}}>{product.name}</h3>

                      </Paper>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    {/* </Box> */}
    </>
  )
}

export default AllProducts
