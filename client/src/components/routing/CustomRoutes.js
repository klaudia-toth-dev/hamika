import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Alert from "../layout/Alert";
import NotFound from "../layout/NotFound";
import PrivateRoute from "./PrivateRoute";
import { getCurrentProfile } from "../../actions/profile";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import OrdersScreen from "../../screens/auth/OrdersScreen";
import AdminScreen from "../../screens/auth/AdminScreen";

function CustomRoutes({
  // getCurrentProfile,
  auth: { user },
  // profile: { profile, loading },
}) {
  // useEffect(() => {
  //   getCurrentProfile();
  // }, [getCurrentProfile]);
  // console.log(user, "ITT?");
  return (
    <section className="container">
      <Alert />
      <Routes>
        {user && (
          <Route
            path="/myorders"
            element={
              <PrivateRoute user={user} isAllowed={!!user}>
                <OrdersScreen />
              </PrivateRoute>
            }
          />
        )}
        {user && (
          <Route
            path="/admin/*"
            element={
              <PrivateRoute
                user={user}
                isAllowed={!!user && user.isAdmin}
                redirectPath="/"
              >
                <AdminScreen />
              </PrivateRoute>
            }
          />
        )}
        <Route element={<NotFound />} />
      </Routes>
    </section>
  );
}

CustomRoutes.propTypes = {
  // getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  // profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  // profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(CustomRoutes);

// export default CustomRoutes;
