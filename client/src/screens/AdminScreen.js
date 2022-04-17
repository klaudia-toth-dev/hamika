import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";
import AdminAddItem from "./AdminAddItem";
import AdminEditItem from "./AdminEditItem";
import AdminMenu from "./AdminMenu";
import AdminUsers from "./AdminUsers";
import AdminOrders from "./AdminOrders";

export default function AdminScreen() {
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!currentUser.isAdmin) {
      window.location.href = "/";
    }
  }, []);
  return (
    <div>
      {currentUser.isAdmin && (
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h1>Admin Panel</h1>
            <ul className="adminfunction">
              {/* <li>
                <a href="/admin/users">Users</a>
              </li> */}
              <li>
                <Link to={"/admin/menu"}>Menu</Link>
              </li>
              <li>
                <Link to={"/admin/additem"}>Add Item</Link>
              </li>
              <li>
                <a href="/admin/orders">Orders</a>
              </li>
            </ul>
            <Routes>
              <Route path="/" element={<AdminMenu />} />
              <Route path="/users" element={<AdminUsers />} />
              <Route path="/menu" element={<AdminMenu />} />
              <Route path="/additem" element={<AdminAddItem />} />
              <Route path="/orders" element={<AdminOrders />} />
              <Route path="/edititem/:id" element={<AdminEditItem />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
}
