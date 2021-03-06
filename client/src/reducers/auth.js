export const auth = (state = { auth: [] }, action) => {
  switch (action.type) {
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case "USER_LOGOUT":
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

// TODO: clean the unused params
export const authLoginReducer = (state = { auth: [] }, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return {
        loading: true,
      };
    case "USER_LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAdmin: action.payload.isAdmin,
        isAuthenticated: true,
        loading: false,
        success: true,
      };
    case "USER_LOGIN_ERROR":
      return {
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case "GOOGLE_LOGIN_REQUEST":
      return {
        loading: true,
      };
    case "GOOGLE_LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAdmin: action.payload.isAdmin,
        isAuthenticated: true,
        loading: false,
        success: true,
      };
    case "GOOGLE_LOGIN_ERROR":
      return {
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
// export const googleLoginReducer = (state = { auth: [] }, action) => {
//   switch (action.type) {
//     case "GOOGLE_LOGIN_REQUEST":
//       return {
//         loading: true,
//       };
//     case "GOOGLE_LOGIN_SUCCESS":
//       console.log(action.payload, "GGOOGLE LOGIN SUCCESS");
//       localStorage.setItem("token", action.payload.token);
//       return {
//         ...state,
//         ...action.payload,
//         isAdmin: action.payload.isAdmin,
//         isAuthenticated: true,
//         loading: false,
//         success: true,
//       };
//     case "GOOGLE_LOGIN_ERROR":
//       console.log(action.payload, "GGOOGLE LOGIN ERROR");

//       return {
//         isAuthenticated: false,
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

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
