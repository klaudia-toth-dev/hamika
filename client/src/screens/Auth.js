import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";

export default function Auth() {
  const state = null;

  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = () => {};
  const handleChange = () => {};
  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
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
                  //   value={name}
                  required
                  onChange={handleChange}
                />
              )}
              <input
                type="text"
                placeholder="email"
                className="form-control"
                // value={email}
                required
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="password"
                className="form-control"
                // value={password}
                required
                onChange={handleChange}
              />
              {isSignUp && (
                <input
                  type="password"
                  placeholder="confirm password"
                  className="form-control"
                  //   value={cpassword}
                  required
                  onChange={handleChange}
                />
              )}
              <button className="btn mt-3 mb-3" type="submit">
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>

              <br />

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
