import axios from "axios";
import { ActionType } from "./actionType";
function getAllProducts(products) {
  return {
    type: ActionType.FETCH_PRODUCTS,
    products,
  };
}

export function getAllProductsData() {
  return (dispatch) => {
    axios
      .get("http://localhost:3002/allProducts")
      .then((res) => {
        console.log(res.data, " all products");
        dispatch(getAllProducts(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
