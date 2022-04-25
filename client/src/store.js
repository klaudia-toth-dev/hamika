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
import {
  getAllUsersReducer,
  registerUserReducer,
  loginUserReducer,
  //   authReducer,
} from "./reducers/userReducers";
import {
  placeOrderReducer,
  getUserOrdersReducer,
  getAllOrdersReducer,
} from "./reducers/orderReducers";

const finalReducer = combineReducers({
  getAllItemsReducer: getAllItemsReducer,
  cartReducer: cartReducer,
  registerUserReducer: registerUserReducer,
  getAllUsersReducer: getAllUsersReducer,
  loginUserReducer: loginUserReducer,
  //   authReducer: authReducer,
  addItemReducer: addItemReducer,
  getItemByIdReducer: getItemByIdReducer,
  placeOrderReducer: placeOrderReducer,
  getUserOrdersReducer: getUserOrdersReducer,
  editItemReducer: editItemReducer,
  getAllOrdersReducer: getAllOrdersReducer,
});

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

const initialState = {
  cartReducer: {
    cartItems: cartItems,
  },
  loginUserReducer: {
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
