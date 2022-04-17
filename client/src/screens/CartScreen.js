import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { deleteFromCart } from "../actions/cartActions";
import CheckOut from "../components/CheckOut";

export default function CartScreen() {
  const cartState = useSelector((state) => state.cartReducer);
  const cartItems = cartState.cartItems;
  var subtotal = cartItems.reduce((x, item) => x + item.price, 0);
  const dispatch = useDispatch();
  console.log(cartItems);
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1>My Cart</h1>
          {cartItems.map((item) => {
            return (
              <div className="flex-container">
                <div className="text-left m-1 w-100">
                  <h1>
                    {item.name} - {item.portion}
                  </h1>
                  <h1>
                    Price: {item.quantity} * {item.prices[0][item.portion]} =
                    {item.price}
                  </h1>
                  <h1 style={{ display: "inline" }}>Quantity: </h1>
                  <i
                    className="fa fa-plus"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(
                        addToCart(item, item.quantity + 1, item.portion)
                      );
                    }}
                  ></i>
                  <b>{item.quantity}</b>
                  <i
                    className="fa fa-minus"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(
                        addToCart(item, item.quantity - 1, item.portion)
                      );
                    }}
                  ></i>
                  <hr />
                </div>
                <div className="m-1 w-100">
                  <img
                    src={item.image}
                    style={{ height: "80px", width: "80px" }}
                    alt="item"
                  />
                </div>
                <div className="m-1 w-100">
                  <i
                    className="fa fa-trash mt-5"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(deleteFromCart(item));
                    }}
                  ></i>
                </div>
              </div>
            );
          })}
          {cartItems.length}
        </div>
        <div className="col-md-4 text-right">
          <h2>SubTotal: {subtotal}Ft</h2>
          <CheckOut subtotal={subtotal}></CheckOut>
          {/* <button className="btn">CHECK OUT</button> */}
        </div>
      </div>
    </div>
  );
}
