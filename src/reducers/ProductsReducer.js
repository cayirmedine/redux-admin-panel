import { FETCH_CATEGORY_VALUES, FETCH_SUBCATEGORY_VALUES } from "../actions/ProductsAction";

const INITIAL_STATE = {
  categories: [],
  subcategories: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_VALUES:
      return { ...state, categories: action.payload };

    case FETCH_SUBCATEGORY_VALUES: 
      return { ...state, subcategories: action.payload};

    default:
      return state;
  }
};
