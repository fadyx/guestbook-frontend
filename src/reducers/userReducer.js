import loginService from "../services/auth";
import messageService from "../services/messages";

import { createNotifiation } from "../reducers/notificationReducer";

const defaultUser = {
  id: null,
  displayname: null,
  token: null,
  username: null,
};

const userReducer = (state = defaultUser, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.data;

    case "LOGOUT":
      return defaultUser;

    default:
      return state;
  }
};

export const login = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      if (user) {
        dispatch(onAlreadyLogged(user));
        dispatch(
          createNotifiation(`Successfully logged in as ${username}.`, "success")
        );
      }
    } catch (error) {
      dispatch(
        createNotifiation(`Could not log in, please try again.`, "error")
      );
    }
  };
};

export const signup = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.signup({ username, password });
      if (user) {
        dispatch(onAlreadyLogged(user));
        dispatch(
          createNotifiation(`Successfully signed up as ${username}.`, "success")
        );
      }
    } catch (error) {
      dispatch(
        createNotifiation(
          `Could not sign up, please try again with different username.`,
          "error"
        )
      );
    }
  };
};

export const onAlreadyLogged = (user) => {
  return async (dispatch) => {
    window.localStorage.setItem("loggedMessageUser", JSON.stringify(user));
    messageService.setToken(user.token);
    dispatch({
      type: "LOGIN",
      data: user,
    });
  };
};

export const onLogout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedMessageUser");
    messageService.setToken(null);
    dispatch({ type: "LOGOUT" });
  };
};

export default userReducer;
