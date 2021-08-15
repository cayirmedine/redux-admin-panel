export const LOGIN_CLICK = "LOGIN_CLICK";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const logIn = (username, password) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_CLICK
        })

        if(username == "admin" && password == "admin") {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { redirectUrl:"/dashboard" }
            })
        } else {
            dispatch({
                type: LOGIN_FAILED,
                payload: "Wrong username or password, please try again."
            })
        }
    }
}