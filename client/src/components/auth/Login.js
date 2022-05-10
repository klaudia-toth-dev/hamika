import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, Navigate } from "react-router-dom";
import { login, googleLogin, loadUser } from "../../actions/auth";

import { GoogleLogin } from "react-google-login";

import Loading from "../Loading";
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

  const googleSuccess = async (response) => {
    try {
      dispatch(googleLogin(response.tokenId));
      dispatch(loadUser());
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = () => {
    console.log("Google Login was unsuccessful. Try again later.");
  };

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
          <GoogleLogin
            clientId="1011835344650-bgr918ihmhlqn5g1hrhr46n9aluijhgh.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="btn"
              >
                Google Login
              </button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={"single_host_origin"}
          />
          <p className="my-1">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
