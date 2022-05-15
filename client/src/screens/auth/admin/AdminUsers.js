import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../actions/userActions";

import Loading from "../../../components/Loading";
import Error from "../../../components/Error";

export default function AdminUsers() {
  const dispatch = useDispatch();
  const usersState = useSelector((state) => state.getAllUsersReducer);
  const { users, error, loading } = usersState;

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div className="admin-users">
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      <table className="table styled-table">
        <thead>
          <tr>
            <th className="user-name">Name</th>
            <th className="email">Email</th>
            <th className="role">Role</th>
            {/* <th className=""></th> */}
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => {
              return (
                <tr>
                  <td>{user.firstName + " " + user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "Admin" : "User"}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
