import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({
  user,
  isAllowed,
  redirectPath = "/login",
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? (
    <div>{React.cloneElement(children, { user })}</div>
  ) : (
    <Outlet />
  );
};

export default PrivateRoute;
