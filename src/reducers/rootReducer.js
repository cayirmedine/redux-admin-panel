import { combineReducers } from "redux";
import { ProductsReducer } from "./ProductsReducer";
import { LoginReducer } from "./LoginReducer";

export default combineReducers({
    ProductsReducer, LoginReducer
})