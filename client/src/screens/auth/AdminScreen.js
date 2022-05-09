import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";

import AdminWelcome from "./admin/AdminWelcome";
import AdminAddItem from "./admin/AdminAddItem";
import AdminEditItem from "./admin/AdminEditItem";
import AdminMenu from "./admin/AdminMenu";
import AdminUsers from "./admin/AdminUsers";
import AdminOrders from "./admin/AdminOrders";

export default function AdminScreen() {
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="admin-content">
            <Routes>
              <Route path="/" element={<AdminWelcome />} />
              <Route path="/users" element={<AdminUsers />} />
              <Route path="/menu" element={<AdminMenu />} />
              <Route path="/additem" element={<AdminAddItem />} />
              <Route path="/orders" element={<AdminOrders />} />
              <Route path="/edititem/:id" element={<AdminEditItem />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
