import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/userActions";
// import { useLocation } from "react-router-dom";
export default function Navbar() {
  const cartState = useSelector((state) => state.cartReducer);
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const dispatch = useDispatch();
  // const location = useLocation();

  useEffect(() => {
    const token = user?.token;

    //JWT token

    setUser(JSON.parse(localStorage.getItem("currentUser")));
    console.log(user, "user - auth");
    // console.log(user.result.name, "currentUser");
  }, []);

  return (
    <div className="navbar-div sticky real-nav">
      <nav className="navbar navbar-expand-lg">
        {currentUser && currentUser.isAdmin ? (
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
            {!currentUser && cartState.cartItems.length > 0 && (
              <li className="nav-item mr-3">
                <a className="nav-link" href="/cart">
                  <b>Cart </b>
                  <span className="cart-items-num">
                    {cartState.cartItems.length}
                  </span>
                </a>
              </li>
            )}
            {currentUser &&
              !currentUser.isAdmin &&
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
            {currentUser && currentUser.isAdmin && (
              <li className="nav-item mt-2 mr-3">
                <b>{currentUser.name} </b>
                {/* <b>{user && user.result.name} </b> */}
              </li>
            )}
            {currentUser && !currentUser.isAdmin && (
              <div className="dropdown">
                <button
                  className="dropdown-toggle btn profile-button"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <b>{currentUser.name} </b>
                  {/* <b>{user && user.result.name} </b> */}
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
            )}
            {currentUser && currentUser.isAdmin && (
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/"
                  onClick={() => {
                    dispatch(logoutUser());
                  }}
                >
                  <b>Logout</b>
                </a>
              </li>
            )}
            {!currentUser && (
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  <b>Login</b>
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
