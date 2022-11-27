import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from "../ActionType";
import { api } from "../../Api/index";

const asyncLocalStorage = {
  setItem: async function (key, value) {
    await null;
    return localStorage.setItem(key, value);
  },
  getItem: async function (key) {
    await null;
    return localStorage.getItem(key);
  },
};

export const login = (payload) => (dispatch) => {
  dispatch({
    type: LOGIN,
  });

  const request = api.login(payload);

  return request.then(
    (response) => dispatch(loginSuccess(response)),
    (err) => dispatch(loginFail(err))
  );
};

export const loginSuccess =
  ({ data }) =>
  (dispatch) => {
    return Promise.all([
      asyncLocalStorage.setItem("quadrant", JSON.stringify(data)),
      dispatch,
    ]).then((dispatch) => {
      return dispatch[1]({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    });
  };

export const loginFail = (data) => (dispatch) => {
  return dispatch({
    type: LOGIN_FAIL,
    payload: data,
  });
};
