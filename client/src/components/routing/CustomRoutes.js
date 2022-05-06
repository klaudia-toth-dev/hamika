import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Alert from "../layout/Alert";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "../layout/NotFound";
import PrivateRoute from "./PrivateRoute";
import { getCurrentProfile } from "../../actions/profile";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function CustomRoutes({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return (
    <section className="container">
      <h1>{user && user.firstName}</h1>
      <Alert />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute user={user}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        {/* <PrivateRoute path="/dashboard" element={<Dashboard />} /> */}
        <Route element={<NotFound />} />
      </Routes>
    </section>
  );
}

CustomRoutes.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(CustomRoutes);

// export default CustomRoutes;
