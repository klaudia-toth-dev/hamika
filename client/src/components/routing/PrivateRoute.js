// import React from "react";
// import { Route, Navigate } from "react-router-dom";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";

// const PrivateRoute = ({
//   component: Component,
//   auth: { isAuthenticated, loading },
//   ...rest
// }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
//     }
//   />
// );

// PrivateRoute.propTypes = {
//   auth: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

// export default connect(mapStateToProps)(PrivateRoute);

import { Routes, Route, Link, Navigate } from "react-router-dom";

const PrivateRoute = ({ user, redirectPath = "/auth/login", children }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default PrivateRoute;
