import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {
  const cartState = useSelector((state) => state.cartReducer);

  const adminLinks = (
    <Fragment>
      <Link className="navbar-brand" to="/auth/admin">
        <i className="fas fa-utensils" /> <b> HAMIKA - ADMIN</b>
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
            <div className="nav-link">
              {user && <span>Hi {user.firstName}!</span>}
            </div>
          </li>

          <li className="nav-item mr-3">
            <div className="nav-link">
              <Link to="/auth/admin/users">Users</Link>
            </div>
          </li>
          <li className="nav-item mr-3">
            <div className="nav-link">
              <Link to="/auth/admin/menu">Menu</Link>
            </div>
          </li>
          <li className="nav-item mr-3">
            <div className="nav-link">
              <Link to="/auth/admin/additem">Add Item</Link>
            </div>
          </li>
          <li className="nav-item mr-3">
            <div className="nav-link">
              <Link to="/auth/admin/orders">Orders</Link>
            </div>
          </li>

          <li className="nav-item mr-3">
            <Link className="nav-link" to="/" onClick={logout}>
              <b>Logout </b>
            </Link>
          </li>
        </ul>
      </div>
    </Fragment>
  );

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
            <div className="nav-link">
              {user && <span>Hi {user.firstName}!</span>}
            </div>
          </li>
          <li className="nav-item mr-3">
            <Link className="nav-link" to="/auth/myorders">
              <b>My orders </b>
            </Link>
          </li>
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
          <li className="nav-item mr-3">
            <Link className="nav-link" to="/" onClick={logout}>
              <b>Logout </b>
            </Link>
          </li>
        </ul>
      </div>
    </Fragment>
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
            <Link className="nav-link" to="/login">
              <b>Login</b>
            </Link>
          </li>
        </ul>
      </div>
    </Fragment>
  );

  if (user && user.isAdmin) {
    return (
      <div className="navbar-div sticky real-nav">
        <nav className="navbar navbar-expand-lg">{adminLinks}</nav>
      </div>
    );
  }

  return (
    <div className="navbar-div sticky real-nav">
      <nav className="navbar navbar-expand-lg">
        {isAuthenticated ? authLinks : guestLinks}
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
