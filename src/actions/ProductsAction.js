import { api } from "../api";

export const FETCH_CATEGORY_VALUES = "FETCH_CATEGORY_VALUES";
export const FETCH_SUBCATEGORY_VALUES = "FETCH_SUBCATEGORY_VALUES";
export const FETCH_PRODUCT_VALUES = "FETCH_PRODUCT_VALUES";

export const fetchCategories = () => {
  return (dispatch) => {
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
  };
};

export const fetchSubCategories = () => {
  return (dispatch) => {
    api()
      .get("/sub-categories")
      .then((response) => {
        // this.setState({ subcategories: response.data });
        dispatch({
          type: FETCH_SUBCATEGORY_VALUES,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const fetchProducts = () => {
  return (dispatch) => {
    api()
      .get("/products")
      .then((response) => {
        dispatch({
          type: FETCH_PRODUCT_VALUES,
          payload: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
