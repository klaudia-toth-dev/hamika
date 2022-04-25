import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { deleteFromCart } from "../actions/cartActions";
import CheckOut from "../components/CheckOut";

export default function CartScreen() {
  const userState = useSelector((state) => state.loginUserReducer);

  const { currentUser } = userState;

  useEffect(() => {
    if (currentUser && currentUser.isAdmin) {
      window.location.href = "/admin";
    }
  }, []);

  const cartState = useSelector((state) => state.cartReducer);
  const cartItems = cartState.cartItems;
  var subtotal = cartItems.reduce((x, item) => x + item.price, 0);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="d-flex">
        <a href="/menu" className="back-to-order-link">
          <i class="fa fa-chevron-left" aria-hidden="true">
            <span> back to order</span>
          </i>
        </a>
      </div>
      <div className="cart-screen">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <h1>My Cart</h1>
            {!cartState.cartItems.length > 0 && (
              <div>
                <h3>SORRY, YOU CART IS EMPTY...</h3>
                <h3>BUT WE KNOW THAT YOU ARE HUNGRY</h3>
                <hr></hr>
                <a className="btn" href="/menu">
                  Go back to order
                </a>
              </div>
            )}
            {cartState.cartItems.length > 0 &&
              cartItems.map((item) => {
                return (
                  <div className="flex-container shadow-sm p-4 mb-3 rounded cart-card">
                    <div className="m-1 cart-item-picture">
                      <img src={item.image} alt="item" />
                    </div>
                    <div className="text-left m-1 pl-3 pr-3 cart-item-info">
                      <h3>{item.name}</h3>
                      <p>
                        Portion: <b className="darker-beige">{item.portion}</b>
                      </p>
                      <p>
                        Price:{" "}
                        <b className="darker-beige">
                          {item.quantity} * {item.prices[0][item.portion]} ={" "}
                          {item.price}
                        </b>
                      </p>
                      <p style={{ display: "inline" }}>Quantity: </p>
                      <i
                        className="fa fa-minus"
                        aria-hidden="true"
                        onClick={() => {
                          dispatch(
                            addToCart(item, item.quantity - 1, item.portion)
                          );
                        }}
                      ></i>
                      <b>{item.quantity}</b>
                      <i
                        className="fa fa-plus"
                        aria-hidden="true"
                        onClick={() => {
                          dispatch(
                            addToCart(item, item.quantity + 1, item.portion)
                          );
                        }}
                      ></i>
                      <hr />
                    </div>
                    <div className="m-1 cart-item-action">
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
          </div>
          {cartState.cartItems.length > 0 && currentUser && (
            <div className="col-md-12 text-right mt-3">
              <h2>Total: {subtotal}Ft</h2>
              <CheckOut subtotal={subtotal}></CheckOut>
            </div>
          )}
          {cartState.cartItems.length > 0 && !currentUser && (
            <div className="col-md-12 text-right mt-3">
              <a href="/login" className="btn">
                Log in to finish
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
