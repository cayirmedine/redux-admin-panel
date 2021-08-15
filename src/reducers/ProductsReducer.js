import {
  FETCH_CATEGORY_VALUES,
  FETCH_SUBCATEGORY_VALUES,
  FETCH_PRODUCT_VALUES,
  FETCH_CAMPAIGN_VALUES,
  FETCH_CATEGORY_SUB_CAT_VALUES,
  FETCH_CAMPAIGN_PRODUCT_VALUES,
  ADD_CATEGORY_CLICK,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILED,
  ADD_SUBCATEGORY_CLICK,
  ADD_SUBCATEGORY_SUCCESS,
  ADD_SUBCATEGORY_FAILED,
  ADD_PRODUCT_CLICK,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILED,
  ADD_CAMPAIGN_CLICK,
  ADD_CAMPAIGN_SUCCESS,
  ADD_CAMPAIGN_FAILED,
  EDIT_CATEGORY_CLICK,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_FAILED,
  EDIT_SUBCATEGORY_CLICK,
  EDIT_SUBCATEGORY_SUCCESS,
  EDIT_SUBCATEGORY_FAILED,
  EDIT_PRODUCT_CLICK,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAILED,
  EDIT_CAMPAIGN_CLICK,
  EDIT_CAMPAIGN_SUCCESS,
  EDIT_CAMPAIGN_FAILED,
} from "../actions/ProductsAction";

const INITIAL_STATE = {
  categoriesValues: [],
  subcategoriesValues: [],
  productsValues: [],
  campaignsValues: [],
  catSubCategoriesValues: [],
  campaignProducts: [],
  productCategoriesSpinnerValue: false,
  productSubCategoriesSpinnerValue: false,
  productSpinnerValue: false,
  productCampaignSpinnerValue: false,
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
      return {
        ...state,
        subcategoriesValues: action.payload,
        redirectUrlValue: "",
      };

    case FETCH_PRODUCT_VALUES:
      return { ...state, productsValues: action.payload, redirectUrlValue: "" };

    case FETCH_CAMPAIGN_VALUES:
      return {
        ...state,
        campaignsValues: action.payload,
        redirectUrlValue: "",
      };

    case FETCH_CATEGORY_SUB_CAT_VALUES:
      return {
        ...state,
        catSubCategoriesValues: action.payload,
        redirectUrlValue: "",
      };

      case FETCH_CAMPAIGN_PRODUCT_VALUES:
        return {
          ...state,
          campaignProducts: action.payload,
          redirectUrlValue: "",
        };

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

    case ADD_PRODUCT_CLICK:
      return {
        ...state,
        productSpinnerValue: true,
      };

    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        productSpinnerValue: false,
        redirectUrlValue: action.payload.redirectUrl,
      };

    case ADD_PRODUCT_FAILED:
      console.log("ADD_PRODUCT_FAILED is running");
      return {
        ...state,
        productSpinnerValue: false,
        // productSubCategoryTitleErrorValue: "",
        // productSubCategoryImageErrorValue: ""
        // productsSubCategoriesErrorValues: []
      };

    case ADD_CAMPAIGN_CLICK:
      return {
        ...state,
        productCampaignSpinnerValue: true,
      };

    case ADD_CAMPAIGN_SUCCESS:
      return {
        ...state,
        productCampaignSpinnerValue: false,
        redirectUrlValue: action.payload.redirectUrl,
      };

    case ADD_CAMPAIGN_FAILED:
      console.log("ADD_CAMPAIGN_FAILED is running");
      return {
        ...state,
        productCampaignSpinnerValue: false,
        // productSubCategoryTitleErrorValue: "",
        // productSubCategoryImageErrorValue: ""
        // productsSubCategoriesErrorValues: []
      };

    case EDIT_CATEGORY_CLICK:
      return {
        ...state,
        productCategoriesSpinnerValue: true,
      };

    case EDIT_CATEGORY_SUCCESS:
      return {
        ...state,
        productCategoriesSpinnerValue: false,
        redirectUrlValue: action.payload.redirectUrl,
      };

    case EDIT_CATEGORY_FAILED:
      console.log("EDIT_CATEGORY_FAILED is running");
      return {
        ...state,
        productCategoriesSpinnerValue: false,
        // productCategoryTitleErrorValue: "",
        // productCategoryImageErrorValue: ""
        // productsCategoriesErrorValues: []
      };

    case EDIT_SUBCATEGORY_CLICK:
      return {
        ...state,
        productSubCategoriesSpinnerValue: true,
      };

    case EDIT_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        productSubCategoriesSpinnerValue: false,
        redirectUrlValue: action.payload.redirectUrl,
      };

    case EDIT_SUBCATEGORY_FAILED:
      console.log("EDIT_SUBCATEGORY_FAILED is running");
      return {
        ...state,
        productSubCategoriesSpinnerValue: false,
        // productSubCategoryTitleErrorValue: "",
        // productSubCategoryImageErrorValue: ""
        // productsSubCategoriesErrorValues: []
      };

    case EDIT_PRODUCT_CLICK:
      return {
        ...state,
        productSpinnerValue: true,
      };

    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        productSpinnerValue: false,
        redirectUrlValue: action.payload.redirectUrl,
      };

    case EDIT_PRODUCT_FAILED:
      console.log("EDIT_PRODUCT_FAILED is running");
      return {
        ...state,
        productSpinnerValue: false,
        // productSubCategoryTitleErrorValue: "",
        // productSubCategoryImageErrorValue: ""
        // productsSubCategoriesErrorValues: []
      };

    case EDIT_CAMPAIGN_CLICK:
      return {
        ...state,
        productCampaignSpinnerValue: true,
      };

    case EDIT_CAMPAIGN_SUCCESS:
      return {
        ...state,
        productCampaignSpinnerValue: false,
        redirectUrlValue: action.payload.redirectUrl,
      };

    case EDIT_CAMPAIGN_FAILED:
      console.log("EDIT_CAMPAIGN_FAILED is running");
      return {
        ...state,
        productCampaignSpinnerValue: false,
        // productSubCategoryTitleErrorValue: "",
        // productSubCategoryImageErrorValue: ""
        // productsSubCategoriesErrorValues: []
      };

    default:
      return state;
  }
};
