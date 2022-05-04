import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import history from "../customRoutes/history";
// import { logoutUser } from "../actions/userActions";
import { signout } from "../actions/authActions";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const cartState = useSelector((state) => state.cartReducer);
  // const userState = useSelector((state) => state.authReducer);
  // const { currentUser } = userState;
  const isLoggedIn = localStorage.getItem("profile") ? true : false;
  const currentUserDetails = localStorage.getItem("profile")
    ? JSON.parse(localStorage.getItem("profile")).result
    : "";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // const token = currentUser?.token;
    // JWT
  }, [navigate]);

  return (
    <div className="navbar-div fixed-nav">
      <nav className="navbar navbar-expand-lg">
        {isLoggedIn && currentUserDetails.isAdmin ? (
          <b>ADMIN PANEL</b>
        ) : (
          <a className="navbar-brand" href="/">
            <b>HAMIKA</b>
          </a>
        )}
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto justify-content-end">
            {!isLoggedIn && cartState.cartItems.length > 0 && (
              <li className="nav-item mr-3">
                <a className="nav-link" href="/cart">
                  <b>Cart </b>
                  <span className="cart-items-num">
                    {cartState.cartItems.length}
                  </span>
                </a>
              </li>
            )}
            {isLoggedIn &&
              !currentUserDetails.isAdmin &&
              cartState.cartItems.length > 0 && (
                <li className="nav-item mt-2 mr-3">
                  <a className="nav-link" href="/cart">
                    <b>Cart </b>

                    {cartState.cartItems.length > 0 && (
                      <span className="cart-items-num">
                        {cartState.cartItems.length}
                      </span>
                    )}
                  </a>
                </li>
              )}
            {isLoggedIn && currentUserDetails.isAdmin && (
              <li className="nav-item mt-2 mr-3">
                <b>{currentUserDetails.name} </b>
                <b>{currentUserDetails.isAdmin ? "admin" : ""} </b>
              </li>
            )}
            {isLoggedIn && !currentUserDetails.isAdmin && (
              <div className="dropdown">
                <button
                  className="dropdown-toggle btn profile-button"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <b>{currentUserDetails.name}</b>
                  <b>{currentUserDetails.isAdmin ? "admin" : ""} </b>
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="/orders">
                    Orders
                  </a>
                  <button
                    className="dropdown-item link"
                    onClick={() => {
                      dispatch(signout(navigate));
                    }}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
            {isLoggedIn && currentUserDetails.isAdmin && (
              <li className="nav-item">
                <button
                  className="dropdown-item link"
                  onClick={() => {
                    dispatch(signout(navigate));
                  }}
                >
                  Sign out
                </button>
              </li>
            )}
            {!isLoggedIn && (
              <li className="nav-item">
                <a className="nav-link" href="/auth">
                  <b>Sign In</b>
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
