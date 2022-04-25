import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../actions/userActions";
import Loading from "../components/Loading";
import Error from "../components/Error";

import { GoogleLogin } from "react-google-login";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginState = useSelector((state) => state.loginUserReducer);
  const { error, loading } = loginState;

  console.log(loginState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/menu";
    }
  }, []);

  function login() {
    const user = {
      email,
      password,
    };
    dispatch(loginUser(user));
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      console.log(result, token, "action");
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
          <h1 className="m-2">LOGIN</h1>
          {loading && <Loading />}
          {error && <Error error="Invalid Creditentals" />}

          <div className="auth-fields">
            <input
              type="text"
              placeholder="email"
              className="form-control"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              className="form-control"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn mt-3 mb-3" onClick={login}>
              LOGIN
            </button>
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
            <br />
            <a href="/register">Click Here To Register</a>
          </div>
        </div>
      </div>
    </div>
  );
}
