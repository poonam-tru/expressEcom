import { ActionType } from "./actionType";
import axios from "axios";
import { removeCred, saveLoginCred } from "../utils/helpers";
//function to set user data
export function fetchUserData(user) {
  return {
    type: ActionType.USER_FETCH,
    user,
  };
}
export function logoutUserData() {
  return {
    type: ActionType.USER_LOGOUT,
  };
}

export function fetchUserDataSuccess(success) {
  return {
    type: ActionType.USER_FETCH_SUCCESS,
    success,
  };
}

export function createUserData(user) {
  return {
    type: ActionType.CREATE_USER,
    user,
  };
}

//function to request user data
export const  fetchValidateUser = (data, navigate) => {
  console.log(data, "test");
  return (dispatch) => {
    // dispatch(fetchUserData(data));
    axios
      .post("http://localhost:3002/login", data)
      .then((res) => {
        // const { email } = res.data;
        console.log("email", res.data.contact);
        dispatch(
          fetchUserData({ username: res.data.username, email: res.data.email })
        );
        dispatch(fetchUserDataSuccess(true));
        if (res.data.username) {
          saveLoginCred(res.data.username);
        }
        navigate('/')
      })
      .catch((err) => console.log(err, "fetching user"));
  };
}

export function logoutValidateUser(navigate) {
  return (dispatch) => {
    dispatch(logoutUserData());
    dispatch(fetchUserData({}));
    dispatch(fetchUserDataSuccess(false));
    removeCred("user")
    navigate("/")
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
