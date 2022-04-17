import axios from "axios";
export const placeOrder = (token, subtotal) => async (dispatch, getState) => {
  dispatch({ type: "PLACE_OREDER_REQUEST" });
  const currentUser = getState().loginUserReducer.currentUser;
  const cartItems = getState().cartReducer.cartItems;
  try {
    const response = await axios.post("/api/orders/placeorder", {
      token,
      subtotal,
      currentUser,
      cartItems,
    });
    dispatch({ type: "PLACE_ORDER_SUCCESS" });
    localStorage.removeItem("cartItems");
    window.location.href = "/orders";
    console.log(response);
  } catch (error) {
    dispatch({ type: "PLACE_ORDER_FAILED" });

    console.log(error);
  }
};

export const getUserOrders = () => async (dispatch, getState) => {
  const currentUser = getState().loginUserReducer.currentUser;
  dispatch({ type: "GET_USER_ORDERS_REQUEST" });

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

export const getAllOrders = () => async (dispatch, getState) => {
  const currentUser = getState().loginUserReducer.currentUser;
  dispatch({ type: "GET_ALL_ORDERS_REQUEST" });

  try {
    const response = await axios.get("/api/orders/getallorders");
    console.log(response);
    dispatch({ type: "GET_ALL_ORDERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_ALL_ORDERS_FAILED", payload: error });
  }
};

// export const deliverOrder = (orderId) => async (dispatch) => {
//   try {
//     const response = await axios.post("/api/orders/deliverorder", {
//       orderId: orderId,
//     });
//     console.log(response);
//     alert("Order delivered");
//     const orders = await axios.get("/api/orders/getallorders");
//     dispatch({ type: "GET_ALL_ORDERS_SUCCCESS", payload: orders.data });
//   } catch (error) {
//     console.log(error);
//   }
// };
