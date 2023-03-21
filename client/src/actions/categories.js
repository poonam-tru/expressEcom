import axios from "axios";
import { ActionType } from "./actionType";

function getCategories(catg) {
  return {
    type: ActionType.SHOW_CATEGORIES,
    catg,
  };
}

export function getCategoriesData() {
  return (dispatch) => {
    axios
    .get("http://localhost:3002/categories/")
    .then((res) => {
        dispatch(getCategories(res.data));
        console.log(res.data, "categories----");
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
