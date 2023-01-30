import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProductsData } from "../../actions/products";

export default function SingleProduct() {
  const param = useParams();
  const product = useSelector((state) => state.singleProduct.product);
  console.log(product, "product");
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getSingleProductsData(param.id));
  }, []);

  return (
    <div>
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "25px 0px",
          alignItems: "center",
          maxWidth: 600,
          margin: "auto",
          width: "100%",
        }}
      >
        {/* <CardMedia
          component="img"
          sx={{ width: "100%" }}
          image={u.img}
          alt=""
        /> */}

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent
            sx={{
              flex: "1 0 auto",
              padding: 0,
              paddingBottom: "0px !important",
            }}
          >
            <h2 style={{ margin: 0, paddingBottom: 25 }}>{product.name}</h2>

            <p style={{ margin: 0 }}>{product.description}</p>
          </CardContent>
        </Box>
      </Card>
    </div>
  );
}
