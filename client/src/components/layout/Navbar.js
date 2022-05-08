import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, user, loading }, logout }) => {
  // const pathName = window.location.pathname;
  const cartState = useSelector((state) => state.cartReducer);

  const authLinks = (
    <Fragment>
      <Link className="navbar-brand" to="/">
        <i className="fas fa-utensils" /> <b> HAMIKA</b>
      </Link>
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
          <li className="nav-item mr-3">
            <Link className="nav-link" to="/menu">
              <b>Menu </b>
            </Link>
          </li>
          <li className="nav-item mr-3">
            <Link className="nav-link" to="/cart">
              <b>Cart </b>
              <span className="cart-items-num">
                {cartState.cartItems.length}
              </span>
            </Link>
          </li>
        </ul>
        <div className="dropdown">
          <button
            className="dropdown-toggle btn profile-button"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <b>{user && user.firstName}</b>
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="/orders">
              Orders
            </a>
            <a className="dropdown-item" href="/" onClick={logout}>
              Logout
              {/* <i className="fas fa-sign-out-alt" /> */}
            </a>
          </div>
        </div>
      </div>
    </Fragment>
    // <ul>
    //   <li>
    //     <Link to="/auth/dashboard">
    //       <i className="fas fa-user" />
    //       <span className="hide-sm">Dashboard</span>
    //     </Link>
    //   </li>
    //   <li>
    //     <a onClick={logout} href="#!">
    //       <i className="fas fa-sign-out-alt" />
    //       <span className="hide-sm">Logout</span>
    //     </a>
    //   </li>
    // </ul>
  );

  const guestLinks = (
    <Fragment>
      <Link className="navbar-brand" to="/">
        <i className="fas fa-utensils" /> <b> HAMIKA</b>
      </Link>
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
          <li className="nav-item mr-3">
            <Link className="nav-link" to="/menu">
              <b>Menu </b>
            </Link>
          </li>
          <li className="nav-item mr-3">
            <Link className="nav-link" to="/cart">
              <b>Cart </b>
              <span className="cart-items-num">
                {cartState.cartItems.length}
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/auth/login">
              <b>Login</b>
            </Link>
          </li>
        </ul>
      </div>
      {/* <ul>
        <li>
          <Link to="/auth/register">Register</Link>
        </li>
        <li>
          <Link to="/auth/login">Login</Link>
        </li>
      </ul> */}
    </Fragment>
  );

  return (
    <div className="navbar-div sticky real-nav">
      <nav className="navbar navbar-expand-lg">
        {/* {!loading && ( */}
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        {/* )} */}
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
