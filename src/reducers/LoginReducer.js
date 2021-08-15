import {
  LOGIN_CLICK,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from "../actions/LoginAction";

const INITIAL_STATE = {
  loginSpinnerValue: false,
  loginErrorValue: "",
  redirectUrlValue: "",
};

export const LoginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_CLICK:
      return {
        ...state,
        loginSpinnerValue: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loginSpinnerValue: false,
        redirectUrlValue: action.payload.redirectUrl,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        loginSpinnerValue: false,
        loginErrorValue: action.payload,
      };

    default:
      return state;
  }
};
