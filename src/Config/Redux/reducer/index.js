import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from "../ActionType";

const initialState = {
  login: {
    loading: false,
    error: false,
    data: null,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        login: { ...state.login, loading: true, error: false },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          ...state.login,
          loading: false,
          error: false,
          data: action.payload,
        },
      };
    case LOGIN_FAIL:
      return {
        ...state,
        login: { ...state.login, loading: false, error: action.payload },
      };
    default:
      return state;
  }
};
export default reducer;
