import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/userActions";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginState = useSelector((state) => state.loginUserReducer);
  const { error, loading } = loginState;

  console.log(loginState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/";
    }
  }, []);

  function login() {
    const user = {
      email,
      password,
    };
    dispatch(loginUser(user));
  }

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">
          <h1 className="m-2">LOGIN</h1>
          {loading && <Loading />}
          {error && <Error error="Invalid Creditentals" />}

          <div>
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
            <br />
            <a href="/register" style={{ color: "black" }}>
              Click Here To Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
