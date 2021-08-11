import {
  FETCH_CATEGORY_VALUES,
  FETCH_SUBCATEGORY_VALUES,
  FETCH_PRODUCT_VALUES,
  FETCH_CAMPAIGN_VALUES,
  ADD_CATEGORY_CLICK,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILED,
  ADD_SUBCATEGORY_CLICK,
  ADD_SUBCATEGORY_SUCCESS,
  ADD_SUBCATEGORY_FAILED,
} from "../actions/ProductsAction";

const INITIAL_STATE = {
  categoriesValues: [],
  subcategoriesValues: [],
  productsValues: [],
  campaignsValues: [],
  productCategoriesSpinnerValue: false,
  productSubCategoriesSpinnerValue: false,
  productCategoryTitleErrorValue: "",
  productCategoryImageErrorValue: "",
  redirectUrlValue: "",
};

export const ProductsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_VALUES:
      return {
        ...state,
        categoriesValues: action.payload,
        redirectUrlValue: "",
      };

    case FETCH_SUBCATEGORY_VALUES:
      return { ...state, subcategoriesValues: action.payload };

    case FETCH_PRODUCT_VALUES:
      return { ...state, productsValues: action.payload };

    case FETCH_CAMPAIGN_VALUES:
      return { ...state, campaignsValues: action.payload };

    case ADD_CATEGORY_CLICK:
      return {
        ...state,
        productCategoriesSpinnerValue: true,
      };

    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        productCategoriesSpinnerValue: false,
        redirectUrlValue: action.payload.redirectUrl,
      };

    case ADD_CATEGORY_FAILED:
      console.log("ADD_CATEGORY_FAILED is running");
      return {
        ...state,
        productCategoriesSpinnerValue: false,
        // productCategoryTitleErrorValue: "",
        // productCategoryImageErrorValue: ""
        // productsCategoriesErrorValues: []
      };

    case ADD_SUBCATEGORY_CLICK:
      return {
        ...state,
        productSubCategoriesSpinnerValue: true,
      };

    case ADD_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        productSubCategoriesSpinnerValue: false,
        redirectUrlValue: action.payload.redirectUrl,
      };

    case ADD_SUBCATEGORY_FAILED:
      console.log("ADD_SUBCATEGORY_FAILED is running");
      return {
        ...state,
        productSubCategoriesSpinnerValue: false,
        // productSubCategoryTitleErrorValue: "",
        // productSubCategoryImageErrorValue: ""
        // productsSubCategoriesErrorValues: []
      };

    default:
      return state;
  }
};
