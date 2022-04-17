import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/userActions";

export default function Navbar() {
  const cartState = useSelector((state) => state.cartReducer);
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;

  const dispatch = useDispatch();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <a className="navbar-brand" href="/">
          HAMIKA
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            {currentUser && currentUser.isAdmin && (
              <li className="nav-item mr-3">
                <a className="nav-link" href="/admin">
                  <b>Admin </b>
                </a>
              </li>
            )}
            <li className="nav-item mr-3">
              <a className="nav-link" href="/contact">
                <b>Contact </b>
              </a>
            </li>
            {currentUser ? (
              <div className="dropdown mr-3">
                <button
                  className="dropdown-toggle btn profile-button"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <b>{currentUser.name}</b>
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="/orders">
                    Orders
                  </a>
                  <a
                    className="dropdown-item"
                    href="/"
                    onClick={() => {
                      dispatch(logoutUser());
                    }}
                  >
                    Logout
                  </a>
                </div>
              </div>
            ) : (
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  <b>Login</b>
                </a>
              </li>
            )}
            <li className="nav-item">
              <a className="nav-link" href="/cart">
                <b>Cart </b>

                {cartState.cartItems.length > 0 && (
                  <span className="cart-items-num">
                    cartState.cartItems.length
                  </span>
                )}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
