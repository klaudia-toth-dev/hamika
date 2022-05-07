import React from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { Route, Routes } from "react-router-dom";
// import Register from "../auth/Register";
// import Login from "../auth/Login";
// import Alert from "../layout/Alert";
// import Dashboard from "../dashboard/Dashboard";
// import NotFound from "../layout/NotFound";
// import PrivateRoute from "../routing/PrivateRoute";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/auth/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">MERN Boilerplate</h1>
          <div className="buttons">
            <Link to="/auth/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/auth/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
      {/* <Alert />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <PrivateRoute path="/dashboard" element={<Dashboard />} />
        <Route element={<NotFound />} />
      </Routes> */}
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
