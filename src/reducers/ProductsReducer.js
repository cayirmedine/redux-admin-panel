import { FETCH_CATEGORY_VALUES } from "../actions/ProductsAction";

const INITIAL_STATE = {
  categories: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_VALUES:
      return { ...state, categories: action.payload };

    default:
      return state;
  }
};
