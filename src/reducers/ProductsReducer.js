import {
  FETCH_CATEGORY_VALUES,
  FETCH_SUBCATEGORY_VALUES,
  FETCH_PRODUCT_VALUES,
  FETCH_CAMPAIGN_VALUES,
  ADD_CATEGORY,
} from "../actions/ProductsAction";

const INITIAL_STATE = {
  categories: [],
  subcategories: [],
  products: [],
  campaigns: [],
  categoryInfo: { title: "", image: null },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_VALUES:
      return { ...state, categories: action.payload };

    case FETCH_SUBCATEGORY_VALUES:
      return { ...state, subcategories: action.payload };

    case FETCH_PRODUCT_VALUES:
      return { ...state, products: action.payload };

    case FETCH_CAMPAIGN_VALUES:
      return { ...state, campaigns: action.payload };

    case ADD_CATEGORY:
      return {
        ...state,
        categoryInfo: {
          ...state.categoryInfo,
          categories: [...state.categories, action.payload],
        },
      };

    default:
      return state;
  }
};
