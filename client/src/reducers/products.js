// import { ActionType } from "../actions/actionType";

const initialState = {
  products: [],
};

export const productsReducer = (state = initialState, action) => {
    console.log('here is the entry')
  switch (action.type) {
    case 'FETCH_PRODUCTS':
      console.log(action.products, "products reducer");
      return { ...state, products: action.products };
    default:
      return state;
  }
};
