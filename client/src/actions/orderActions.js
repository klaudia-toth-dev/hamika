import axios from "axios";
export const placeOrder =
  (token, subtotal, note, navigate) => async (dispatch, getState) => {
    dispatch({ type: "PLACE_OREDER_REQUEST" });
    const currentUser = getState().auth.user;
    const cartItems = getState().cartReducer.cartItems;
    try {
      const response = await axios.post("/api/orders/placeorder", {
        token,
        subtotal,
        currentUser,
        cartItems,
        note,
      });
      dispatch({ type: "PLACE_ORDER_SUCCESS" });
      localStorage.removeItem("cartItems");
      navigate("/auth/myorders");
    } catch (error) {
      dispatch({ type: "PLACE_ORDER_FAILED" });
      console.log(error);
    }
  };

export const getUserOrders = () => async (dispatch, getState) => {
  dispatch({ type: "GET_USER_ORDERS_REQUEST" });
  const currentUser = getState().auth.user;
  try {
    const response = await axios.post("/api/orders/getuserorders", {
      userId: currentUser._id,
    });
    console.log(response);
    dispatch({ type: "GET_USER_ORDERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_USER_ORDERS_FAILED", payload: error });
  }
};

export const getAllOrders = (pageNumber) => async (dispatch, getState) => {
  dispatch({ type: "GET_ALL_ORDERS_REQUEST" });
  try {
    const response = await axios.get("/api/orders/getallorders", {
      params: { page: pageNumber },
    });
    console.log(response);
    dispatch({ type: "GET_ALL_ORDERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_ALL_ORDERS_FAILED", payload: error });
  }
};

export const deliverOrder = (orderId, orderStatus) => async (dispatch) => {
  try {
    const response = await axios.post("/api/orders/deliverorder", {
      orderId: orderId,
      orderStatus: orderStatus,
    });
    const orders = await axios.get("/api/orders/getallorders");
    dispatch({ type: "GET_ALL_ORDERS_SUCCCESS", payload: orders.data });
  } catch (error) {
    console.log(error);
  }
};
