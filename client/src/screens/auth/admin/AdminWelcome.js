import React from "react";
import { Link } from "react-router-dom";

export default function AdminWelcome() {
  const today = new Date();
  return (
    <div className="admin-menu">
      <h1>WELCOME ON THE ADMIN PANEL</h1>
      <h3>
        TODAY {"  "}
        {today.getDate() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getFullYear()}
      </h3>
      <div className="admin-w-card-container row">
        <div className="admin-w-card-div col-md-6">
          <Link to={"users"}>
            <div className="admin-w-card ">
              Show me the users
              <div>
                <i className="fa-solid fa-users fa-2xl"></i>
              </div>
            </div>
          </Link>
        </div>
        <div className="admin-w-card-div col-md-6">
          <Link to={"menu"}>
            <div className="admin-w-card ">
              Show me the menu
              <div>
                <i className="fa-solid fa-bowl-food fa-2xl"></i>
              </div>
            </div>
          </Link>
        </div>
        <div className="admin-w-card-div col-md-6">
          <Link to={"orders"}>
            <div className="admin-w-card ">
              Show me the orders
              <div>
                <i className="fa-regular fa-clipboard fa-2xl"></i>
              </div>
            </div>
          </Link>
        </div>
        <div className="admin-w-card-div col-md-6">
          <Link to={"additem"}>
            <div className="admin-w-card">
              I have a new item
              <div>
                <i className="fa-regular fa-square-plus fa-2xl"></i>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
