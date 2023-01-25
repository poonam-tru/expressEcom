import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsData } from "../../actions/products";
export default function Allproducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts.products);
  React.useEffect(() => {
    dispatch(getAllProductsData());
  }, [dispatch]);

  return (
    <Grid sx={{ flexGrow: 1 }} container>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          {products.map((product) => (
            <Grid key={product.sku_id} item padding="20px">
              <Link
                style={{ textDecoration: "none" }}
                to={`/product/${product.sku_id}`}
              >
                <Paper
                  sx={{
                    // height: 230,
                    width: 200,
                    textAlign: "center",
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                  }}>
                    <h3 style={{ margin: 0 , padding: '10px 0px' , borderBottom: '1px solid #ddd'}}>{product.name}</h3>
                    {/* <img alt='' style={{ display: 'block', width: '100%' , borderRadius:"20px"}} src={u.img}/> */}

                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
