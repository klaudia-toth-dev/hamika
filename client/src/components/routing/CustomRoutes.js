import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../layout/NotFound";
import PrivateRoute from "./PrivateRoute";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import OrdersScreen from "../../screens/auth/OrdersScreen";
import AdminScreen from "../../screens/auth/AdminScreen";

function CustomRoutes({ auth: { user } }) {
  return (
    <section className="container">
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
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(CustomRoutes);

// export default CustomRoutes;
