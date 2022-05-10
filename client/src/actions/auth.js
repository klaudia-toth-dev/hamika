import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => async (dispatch) => {
  console.log("loadUser");
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: "USER_LOADED",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "AUTH_ERROR",
    });
  }
};

// Register User
export const register =
  ({ firstName, lastName, email, password }) =>
  async (dispatch) => {
    dispatch({ type: "USER_REGISTER_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ firstName, lastName, email, password });

    try {
      const res = await axios.post("/api/users/register", body, config);
      dispatch({
        type: "USER_REGISTER_SUCCESS",
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((err) =>
          dispatch({ type: "USER_REGISTER_ERROR", payload: err.msg })
        );
      }
    }
  };

// Login User
export const login = (email, password) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/users/login", body, config);

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((err) =>
        dispatch({ type: "USER_LOGIN_ERROR", payload: err.msg })
      );
    }
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: "USER_LOGOUT" });
};
