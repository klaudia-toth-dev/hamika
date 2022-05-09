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

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({
  user,
  isAllowed,
  redirectPath = "/login",
  children,
}) => {
  console.log("PRIVATE ROUTE");
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
    // return <Navigate to="/login" replace />;
  }

  return children ? (
    <div>{React.cloneElement(children, { user })}</div>
  ) : (
    <Outlet />
  );
  // return <div>{React.cloneElement(children, { user })}</div>;
};

export default PrivateRoute;
