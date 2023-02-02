import { combineReducers } from "redux";
import { userReducer } from "./user";
import { productsReducer } from "./products";
import { SingleProductReducer } from "./singleProduct";
import { counterReducer } from './counterReducer'
import { categoriesReducer } from './categoriesReducer'

export default combineReducers({
  user: userReducer,
  allProducts: productsReducer,
  singleProduct: SingleProductReducer,
  counterReducer:counterReducer,
  categoriesReducer:categoriesReducer
});
