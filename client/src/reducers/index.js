import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";

import {
  getAllItemsReducer,
  addItemReducer,
  editItemReducer,
  getItemByIdReducer,
} from "./itemReducers";
import { cartReducer } from "./cartReducer";
import {
  getAllUsersReducer,
  registerUserReducer,
  loginUserReducer,
} from "./userReducers";
import {
  placeOrderReducer,
  getUserOrdersReducer,
  getAllOrdersReducer,
} from "./orderReducers";

export default combineReducers({
  alert,
  auth,
  profile,
  getAllItemsReducer: getAllItemsReducer,
  cartReducer: cartReducer,
  // registerUserReducer: registerUserReducer,
  getAllUsersReducer: getAllUsersReducer,
  // loginUserReducer: loginUserReducer,
  addItemReducer: addItemReducer,
  getItemByIdReducer: getItemByIdReducer,
  placeOrderReducer: placeOrderReducer,
  getUserOrdersReducer: getUserOrdersReducer,
  editItemReducer: editItemReducer,
  getAllOrdersReducer: getAllOrdersReducer,
});
