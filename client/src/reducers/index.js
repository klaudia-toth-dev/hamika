import { combineReducers } from "redux";
// import alert from "./alert";
// import auth from "./auth";
// import profile from "./profile";

import {
  auth,
  authRegisterReducer,
  authLoginReducer,
  // authLogoutReducer,
} from "./auth";
import {
  getAllItemsReducer,
  addItemReducer,
  editItemReducer,
  getItemByIdReducer,
} from "./itemReducers";
import { cartReducer } from "./cartReducer";
import { getAllUsersReducer } from "./userReducers";
import {
  placeOrderReducer,
  getUserOrdersReducer,
  getAllOrdersReducer,
} from "./orderReducers";

export default combineReducers({
  // alert,
  auth,
  authRegisterReducer: authRegisterReducer,
  authLoginReducer: authLoginReducer,
  // authLogoutReducer: authLogoutReducer,
  // profile,
  getAllItemsReducer: getAllItemsReducer,
  cartReducer: cartReducer,
  getAllUsersReducer: getAllUsersReducer,
  addItemReducer: addItemReducer,
  getItemByIdReducer: getItemByIdReducer,
  placeOrderReducer: placeOrderReducer,
  getUserOrdersReducer: getUserOrdersReducer,
  editItemReducer: editItemReducer,
  getAllOrdersReducer: getAllOrdersReducer,
});
