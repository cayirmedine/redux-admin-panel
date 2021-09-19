import axios from "axios";

export const LOGIN_CLICK = "LOGIN_CLICK";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const GOOGLE_LOGIN_CLICK = "GOOGLE_LOGIN_CLICK";
export const GOOGLE_LOGIN_SUCCESS = "GOOGLE_LOGIN_SUCCESS";
export const GOOGLE_LOGIN_FAILED = "GOOGLE_LOGIN_FAILED";

export const logIn = (userValues) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_CLICK,
    });

    axios
      .post("http://localhost:5000/auth/sign-in", userValues)
      .then(async (response) => {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.data.access_token;

        await console.log(response.data.data.access_token);

        dispatch({
          type: LOGIN_SUCCESS,
          payload: { data: response.data, redirectUrl: "/dashboard" },
        });
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
};

export const googleLogIn = (token) => {
  return (dispatch) => {
    dispatch({
      type: GOOGLE_LOGIN_CLICK,
    });

    axios
      .post("http://localhost:5000/auth/google-signin", token)
      .then(async (response) => {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.data.access_token;

        dispatch({
          type: GOOGLE_LOGIN_SUCCESS,
          payload: { data: response.data, redirectUrl: "/dashboard" },
        });
      })
      .catch((err) => {
        dispatch({
          type: GOOGLE_LOGIN_FAILED,
        });
      });
  };
};
