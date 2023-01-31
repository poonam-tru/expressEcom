import axios from "axios";
import { ActionType } from "./actionType";
function getAllProducts(products) {
  return {
    type: ActionType.FETCH_PRODUCTS,
    products,
  };
}
function getSingleProduct(product) {
  return {
    type: ActionType.FETCH_SINGLE_PRODUCT,
    product,
  };
}

export function getAllProductsData() {
  return (dispatch) => {
    axios
      .get("http://localhost:3002/products/")
      .then((res) => {
        console.log(res.data, " all products");
        dispatch(getAllProducts(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getSingleProductsData(productId) {
  return (dispatch) => {
    axios
      .get(`http://localhost:3002/product/${productId}`)
      .then((res) => {
        console.log(res.data, " single products");
        dispatch(getSingleProduct(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
