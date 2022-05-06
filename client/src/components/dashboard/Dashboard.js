// import React, { Fragment, useEffect } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import Spinner from "../layout/Spinner";
// import { getCurrentProfile } from "../../actions/profile";

// const Dashboard = ({
//   getCurrentProfile,
//   auth: { user },
//   profile: { profile, loading },
// }) => {
//   useEffect(() => {
//     getCurrentProfile();
//   }, [getCurrentProfile]);

//   return loading && profile === null ? (
//     <Spinner />
//   ) : (
//     <Fragment>
//       <h1 className="large text-primary">Welcome to the DashBoard!</h1>
//       <p className="lead">
//         <i className="fas fa-user" /> Welcome {user && user.firstName}
//       </p>
//     </Fragment>
//   );
// };

// Dashboard.propTypes = {
//   getCurrentProfile: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   profile: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   profile: state.profile,
// });

// export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);

import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getCurrentProfile } from "../../actions/profile";
import { Routes, Route, Link, Navigate } from "react-router-dom";

const Dashboard = ({ user }) => {
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  // useEffect(() => {
  //   getCurrentProfile();
  // }, [getCurrentProfile]);

  return (
    <Fragment>
      <h1 className="large text-primary">
        Welcome to the DashBoard! (Protected: authenticated user required)
      </h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.firstName}
      </p>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
