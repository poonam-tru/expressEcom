import { ActionType } from "../actions/actionType";

const initialState = {
  user: [],
};

export const userReducer = (state = initialState, action) => {
  console.log(ActionType.USER_FETCH);
  switch (action.type) {
    case "USER_FETCH":
      return { ...state, user: action.user };

    case "CREATE_USER":
      console.log("create user reducer payload", action.user);
      return { ...state, user: action.user };
    default:
      return state;
  }
};
