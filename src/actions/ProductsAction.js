import { api } from "../api";

export const FETCH_CATEGORY_VALUES = "FETCH_CATEGORY_VALUES";
export const FETCH_SUBCATEGORY_VALUES = "FETCH_SUBCATEGORY_VALUES";
export const FETCH_PRODUCT_VALUES = "FETCH_PRODUCT_VALUES";
export const FETCH_CAMPAIGN_VALUES = "FETCH_CAMPAIGN_VALUES";
export const ADD_CATEGORY_CLICK   = "ADD_CATEGORY_CLICK";
export const ADD_CATEGORY_SUCCESS = "ADD_CATEGORY_SUCCESS";
export const ADD_CATEGORY_FAILED  = "ADD_CATEGORY_FAILED";
export const ADD_SUBCATEGORY_CLICK   = "ADD_SUBCATEGORY_CLICK";
export const ADD_SUBCATEGORY_SUCCESS = "ADD_SUBCATEGORY_SUCCESS";
export const ADD_SUBCATEGORY_FAILED  = "ADD_SUBCATEGORY_FAILED";

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
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const fetchCampaigns = () => {
  return (dispatch) => {
    api()
      .get("/campaigns")
      .then((response) => {
        dispatch({
          type: FETCH_CAMPAIGN_VALUES,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addCategory = (formData) => {
  return (dispatch) => {

    dispatch({
      type: ADD_CATEGORY_CLICK
    })

    api()
      .post("/categories", formData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((response) => {
        console.log(`response`, response)
        dispatch({
          type: ADD_CATEGORY_SUCCESS,
          payload:{ data: response.data, redirectUrl: "/categories"},
        })
      })
      .catch((err) => {
        dispatch({
          type: ADD_CATEGORY_FAILED,
        })
      });
  };
};

export const addSubCategory = (subCategoryValues) => {
  return (dispatch) => {
    dispatch({
      type: ADD_SUBCATEGORY_CLICK
    })

    api()
      .post("/sub-categories", subCategoryValues)
      .then((response) => {
        dispatch({
          type: ADD_SUBCATEGORY_SUCCESS,
          payload:{ data: response.data, redirectUrl: "/sub-categories"},
        })
      })
      .catch((err) => {
        dispatch({
          type: ADD_SUBCATEGORY_FAILED
        })
      });
  }
}
