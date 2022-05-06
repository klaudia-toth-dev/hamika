// import { combineReducers } from "redux";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers";

const initialState = {};
// const initialState = {
//   cartReducer: {
//     cartItems: cartItems,
//   },
//   loginUserReducer: {
//     currentUser: currentUser,
//   },
// };

// const cartItems = localStorage.getItem("cartItems")
//   ? JSON.parse(localStorage.getItem("cartItems"))
//   : [];

// const currentUser = localStorage.getItem("currentUser")
//   ? JSON.parse(localStorage.getItem("currentUser"))
//   : null;

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
