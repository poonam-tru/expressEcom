import { ActionType } from "./actionType";
import axios from "axios";

//function to set user data
export function fetchUserData(user) {
  return {
    type: ActionType.USER_FETCH,
    user,
  };
}

export function createUserData(user) {
  return {
    type: ActionType.CREATE_USER,
    user,
  };
}

//function to request user data
export function fetchValidateUser(data) {
  console.log(data, "test");
  return (dispatch) => {
    // dispatch(fetchUserData(data));
    axios
      .post("http://localhost:3002/login", data)
      .then((res) => {
        // const { email } = res.data;
        console.log("email", res.data);
        dispatch(fetchUserData(res.data));
      })
      .catch((err) => console.log(err, "fetching user"));
  };
}

//function to create new user
export function createNewUser(data) {
  return (dispatch) => {
    console.log(data);
    axios
      .post("http://localhost:3002/createUser", data)
      .then((res) => {
        console.log(res.data);
        dispatch(createUserData(res.data));
      })
      .catch((err) => console.log(err, "failed to submit"));
  };
}
