import { combineReducers } from "redux";
import { userReducer } from "./user";
import { productsReducer } from "./products";
import { SingleProductReducer } from "./singleProduct";
export default combineReducers({
  user: userReducer,
  allProducts: productsReducer,
  singleProduct: SingleProductReducer,
});
