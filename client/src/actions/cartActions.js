export const addToCart = (item, quantity, portion) => (dispatch, getState) => {
  var cartItem = {
    name: item.name,
    _id: item._id,
    image: item.image,
    portion: portion,
    quantity: Number(quantity),
    //original price
    prices: item.prices,
    //calculated price
    price: item.prices[0][portion] * quantity,
  };

  if (cartItem.quantity > 10) {
    alert("You can not add more than 10 quantities");
  } else {
    if (cartItem.quantity < 1) {
      dispatch({ type: "DELETE_FROM_CART", payload: item });
    } else {
      dispatch({ type: "ADD_TO_CART", payload: cartItem });
    }
  }

  const cartItems = getState().cartReducer.cartItems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const deleteFromCart = (item) => (dispatch, getState) => {
  dispatch({ type: "DELETE_FROM_CART", payload: item });
  const cartItems = getState().cartReducer.cartItems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
