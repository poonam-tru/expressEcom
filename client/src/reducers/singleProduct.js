const initialState = {
  product: [],
};

export const SingleProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_SINGLE_PRODUCT":
      console.log(action.product, "products reducer");
      return { ...state, product: action.product };
    default:
      return state;
  }
};
