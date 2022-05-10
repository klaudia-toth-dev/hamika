import { combineReducers } from "redux";

import { auth, authRegisterReducer, authLoginReducer } from "./auth";
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
  auth,
  authRegisterReducer: authRegisterReducer,
  authLoginReducer: authLoginReducer,
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
