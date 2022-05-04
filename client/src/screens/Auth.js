import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { signin, signup } from "../actions/authActions.js";

const initialState = { name: "", email: "", password: "", confirmPassword: "" };

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/menu");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = () => {
    console.log("Google Login was unsuccessful. Try again later.");
  };

  return (
    <div>
      <div className="row justify-content-center auth-content">
        <div className="text-left shadow-lg auth-card rounded">
          <h1 className="m-2">{isSignUp ? "Sign up" : "Sign In"}</h1>
          <form onSubmit={handleSubmit}>
            <div className="auth-fields">
              {isSignUp && (
                <input
                  type="text"
                  placeholder="name"
                  className="form-control"
                  name="name"
                  required
                  onChange={handleChange}
                />
              )}
              <input
                type="text"
                placeholder="email"
                className="form-control"
                name="email"
                required
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="password"
                className="form-control"
                name="password"
                required
                onChange={handleChange}
              />
              {isSignUp && (
                <input
                  type="password"
                  placeholder="confirm password"
                  className="form-control"
                  name="confirmPassword"
                  required
                  onChange={handleChange}
                />
              )}
              <div>
                <button className="btn mt-3 mb-3 mr-2" type="submit">
                  {isSignUp ? "Sign Up" : "Sign In"}
                </button>
                {!isSignUp && (
                  <GoogleLogin
                    clientId="1011835344650-bgr918ihmhlqn5g1hrhr46n9aluijhgh.apps.googleusercontent.com"
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className="btn"
                      >
                        Google Sign In
                      </button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy={"single_host_origin"}
                  />
                )}
              </div>

              <button className="link" onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Dont have an account? Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
