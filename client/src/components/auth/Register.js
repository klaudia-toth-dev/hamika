import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });

  const { firstName, lastName, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ firstName, lastName, email, password });
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/auth/dashboard" />;
  }

  return (
    <Fragment>
      <div className="row justify-content-center auth-content">
        <div className="text-left shadow-lg auth-card rounded">
          <h1 className="my-2">Sign Up</h1>
          <p className="lead">
            <i className="fas fa-user" /> Create Your Account
          </p>
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
            Already have an account? <Link to="/auth/login">Sign In</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
