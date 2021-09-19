import {
  LOGIN_CLICK,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  GOOGLE_LOGIN_CLICK,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAILED,
} from "../actions/LoginAction";

const INITIAL_STATE = {
  loginSpinnerValue: false,
  loginErrorValue: "",
  redirectUrlValue: "",
  googleLoginErrorValue: "",
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

    case GOOGLE_LOGIN_CLICK:
      return {
        ...state,
      };

    case GOOGLE_LOGIN_SUCCESS:
      return {
        ...state,
        redirectUrlValue: action.payload.redirectUrl,
      };

    case GOOGLE_LOGIN_FAILED:
      return {
        ...state,
        loginErrorValue: action.payload,
      };

    default:
      return state;
  }
};
