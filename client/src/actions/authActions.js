import * as api from "../api/index.js";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: "AUTH", data });
    navigate("/menu");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: "AUTH", data });
    navigate("/menu");
  } catch (error) {
    console.log(error);
  }
};

export const signout = (navigate) => (dispatch) => {
  dispatch({ type: "SIGNOUT" });
  navigate("/auth");
};
