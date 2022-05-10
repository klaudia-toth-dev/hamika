import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

import Loading from "../Loading";
// import Success from "../Success";
import Error from "../Error";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const loginState = useSelector((state) => state.authLoginReducer);
  const { error, loading, isAuthenticated } = loginState;

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  if (isAuthenticated) {
    return <Navigate to="/menu" />;
  }

  return (
    <Fragment>
      <div className="row justify-content-center auth-content">
        <div className="text-left shadow-lg auth-card rounded">
          <h1 className="my-2">Sign In</h1>
          <p className="lead">
            <i className="fas fa-user" /> Sign Into Your Account
          </p>
          {loading && <Loading />}
          {error && <Error error={error} />}
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="auth-fields">
              <input
                className="form-control"
                id="email-input"
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                required
              />
              <input
                className="form-control"
                id="password-input"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
                minLength="6"
              />
              <button type="submit" className="btn mt-3 mb-3">
                SIGN IN
              </button>
            </div>
          </form>
          <p className="my-1">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
