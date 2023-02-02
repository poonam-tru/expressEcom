
const initialState = {
    catg: [],
  };
  
  export const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
      
      case 'SHOW_CATEGORIES':
        console.log(action.catg, "catggg reducer");
        return { ...state, catg: action.catg };
      default:
        return state;
    }
  }