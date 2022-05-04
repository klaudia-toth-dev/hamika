import { combineReducers } from "redux";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import {
  getAllItemsReducer,
  addItemReducer,
  editItemReducer,
  getItemByIdReducer,
} from "./reducers/itemReducers";
import { cartReducer } from "./reducers/cartReducer";
import { getAllUsersReducer } from "./reducers/userReducers";
import { authReducer } from "./reducers/authReducers";
import {
  placeOrderReducer,
  getUserOrdersReducer,
  getAllOrdersReducer,
} from "./reducers/orderReducers";

const finalReducer = combineReducers({
  getAllItemsReducer: getAllItemsReducer,
  cartReducer: cartReducer,
  getAllUsersReducer: getAllUsersReducer,
  addItemReducer: addItemReducer,
  getItemByIdReducer: getItemByIdReducer,
  placeOrderReducer: placeOrderReducer,
  getUserOrdersReducer: getUserOrdersReducer,
  editItemReducer: editItemReducer,
  getAllOrdersReducer: getAllOrdersReducer,
  authReducer: authReducer,
});

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const currentUser = localStorage.getItem("profile")
  ? JSON.parse(localStorage.getItem("profile"))
  : null;

console.log("currentUser in store", currentUser);
console.log("cartItems in store", cartItems);

const initialState = {
  cartReducer: {
    cartItems: cartItems,
  },
  authReducer: {
    currentUser: currentUser,
  },
};

const composeEnchanters = composeWithDevTools({});
const store = createStore(
  finalReducer,
  initialState,
  composeEnchanters(applyMiddleware(thunk))
);

export default store;
