import { USER_LOADED, LOGIN_SUCCESS, LOGOUT } from "../actions/types";

export const auth = (state = { auth: [] }, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAdmin: action.payload.isAdmin,
        isAuthenticated: true,
        loading: false,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
};

export const authRegisterReducer = (state = { auth: [] }, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return {
        loading: true,
      };
    case "USER_REGISTER_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        // ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        success: true,
      };
    case "USER_REGISTER_ERROR":
      return {
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
