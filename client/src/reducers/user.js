import { ActionType } from "../actions/actionType";

const initialState = {
  user: [],
  success: false,
};

export const userReducer = (state = initialState, action) => {
  console.log(ActionType.USER_FETCH);
  switch (action.type) {
    case "USER_FETCH":
      console.log("create user reducer payload 1", action.user);

      return { ...state, user: action.user };

    case "USER_FETCH_SUCCESS":
      console.log("create user reducer success", action.success);
      return { ...state, success: action.success };

    case "USER_LOGOUT":
      console.log("create user reducer logout");
      return { ...state };

    case "CREATE_USER":
      console.log("create user reducer payload create", action.user);
      return { ...state, user: action.user };
    default:
      return state;
  }
};
