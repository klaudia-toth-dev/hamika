import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, Navigate } from "react-router-dom";
import { register } from "../../actions/auth";
import Loading from "../Loading";
import Success from "../Success";
import Error from "../Error";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });

  const dispatch = useDispatch();

  const registerState = useSelector((state) => state.authRegisterReducer);
  const { error, loading, success, isAuthenticated } = registerState;
  const { firstName, lastName, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Passwords not matched");
    } else {
      dispatch(register({ firstName, lastName, email, password }));
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/menu" />;
  }

  return (
    <Fragment>
      <div className="row justify-content-center auth-content">
        <div className="text-left shadow-lg auth-card rounded">
          <h1 className="my-2">Sign Up</h1>
          <p className="lead">
            <i className="fas fa-user" /> Create Your Account
          </p>
          {loading && <Loading />}
          {success && <Success success="User registered successfully" />}
          {error && <Error error={error} />}

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="auth-fields">
              <input
                className="form-control"
                type="text"
                placeholder="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => onChange(e)}
              />
              <input
                className="form-control"
                type="text"
                placeholder="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => onChange(e)}
              />
              <input
                className="form-control"
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
              />
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
              />
              <input
                className="form-control"
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={(e) => onChange(e)}
              />
            </div>
            <button type="submit" className="btn mt-3 mb-3">
              SIGN UP
            </button>
          </form>
          <p className="my-1">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
