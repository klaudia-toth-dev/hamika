import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AdminAddItem from "./AdminAddItem";
import AdminEditItem from "./AdminEditItem";
import AdminMenu from "./AdminMenu";
import AdminUsers from "./AdminUsers";
import AdminOrders from "./AdminOrders";

export default function AdminScreen() {
  const userState = useSelector((state) => state.authReducer);
  const { currentUser } = userState;

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser.result.isAdmin) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      {currentUser.result.isAdmin && (
        <div className="row justify-content-center">
          <div className="col-md-12">
            <ul className="adminfunction">
              <li>
                <a href="/admin/users">Users</a>
              </li>
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
            <div className="admin-content">
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
        </div>
      )}
    </div>
  );
}
