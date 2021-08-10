import { api } from "../api";

export const FETCH_CATEGORY_VALUES = "FETCH_CATEGORY_VALUES";

export const fetchCategories = () => {
  return dispatch => {
    api()
    .get("/categories")
    .then((response) => {
      dispatch({
        type: FETCH_CATEGORY_VALUES,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
};
