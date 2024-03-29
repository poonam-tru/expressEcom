import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProductsData } from "../../actions/products";
import { Button } from "@mui/material";
import { incrementAction, decrementAction } from "../../actions/counter";
import "./SingleProduct.css";
import Header from "../../pages/Header";
import defaultImg from '../../images/img_4.png'


function SingleProduct(props) {
  const [btn, setBtn] = React.useState(true);
  const param = useParams();
  const product = useSelector((state) => state.singleProduct.product);
  console.log(product, "product");

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getSingleProductsData(param.id));
  }, []);

  const count = useSelector((state) => state.counterReducer.count);
  console.log(count, "count---");

  const handleInc = (evt) => {
    dispatch(incrementAction());
  };

  const handleDec = (evt) => {
    dispatch(decrementAction());
  };

  return (
    <div>
    <Header />
    <div style={{backgroundColor:'rgb(246, 249, 252)',height:'90vh'}}>
    <div style={{padding:'3rem 0rem'}}>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: "25px 0px",
          alignItems: "center",
          maxWidth: 600,
          margin: "auto",
          width: "100%",
        }}
        style={{backgroundColor:'rgb(246, 249, 252)'}}
      >
        <CardMedia
          component="img"
          sx={{ width: "30%" }}
          image={defaultImg}
          alt=""
        />

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
              <p style={{ margin: 0, paddingTop: 20 }}>
                <span style={{ fontWeight: "bolder" }}>Price:</span>{" "}
                {product.price}
              </p>
              <p style={{ margin: 0, paddingTop: 20 }}>
                <span style={{ fontWeight: "bolder" }}>Quantity:</span>{" "}
                {product.quantity}
              </p>

              <div style={{ marginTop: "20px" }}>
                <Button
                  variant="contained"
                  style={{ minWidth: "30px" }}
                  onClick={handleDec}
                  disabled={count === 0}
                >
                  -
                </Button>
                <span
                  style={{
                    width: 30,
                    display: "inline-block",
                    textAlign: "center",
                  }}
                >
                  {count}
                </span>
                <Button
                  variant="contained"
                  style={{ minWidth: "30px" }}
                  onClick={handleInc}
                  disabled={product.quantity === count}
                >
                  +
                </Button>
              </div>

              <div>
                <Button variant="contained" style={{ marginTop: "20px" }}>
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Box>
        </Card>
      </div>
      </div>
    </div>
  );
}

export default SingleProduct;
