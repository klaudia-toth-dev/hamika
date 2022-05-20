export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const alreadyExists = state.cartItems.find(
        (item) =>
          item._id === action.payload._id &&
          item.portion === action.payload.portion
      );
      if (alreadyExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === action.payload._id &&
            item.portion === action.payload.portion
              ? action.payload
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }
    case "DELETE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) =>
            item._id !== action.payload._id ||
            item.portion !== action.payload.portion
        ),
      };
    default:
      return state;
  }
};
