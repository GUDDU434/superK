import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { reducer as Product } from "./product/product.reducer";
import { reducer as Prod_Store } from "./product_store/product_store.reducer";


let rootReducer = combineReducers({
  Product,
  Prod_Store,
});
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
