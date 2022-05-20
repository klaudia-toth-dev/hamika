import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { getUserOrders } from "../../actions/orderActions";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import PropTypes from "prop-types";

import openSocket from "socket.io-client";
let socket;

const OrdersScreen = ({ auth: { isAuthenticated, user }, logout }) => {
  const dispatch = useDispatch();

  const orderState = useSelector((state) => state.getUserOrdersReducer);
  const { orders, error, loading } = orderState;

  socket = openSocket("http://localhost:5000");
  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  useEffect(() => {
    socket.on("update order status", () => {
      dispatch(getUserOrders());
    });
    socket.on("place order", () => {
      dispatch(getUserOrders());
    });
  });

  return (
    <div className="order-screen">
      <div className="row ">
        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}
        <h1>Actual Orders</h1>
        {orders &&
          orders.map((order) => {
            if (!order.isDelivered) {
              return (
                <div className="col-md-12 shadow-sm p-4 mb-3 rounded order-card">
                  <div className="flex-container w-100">
                    <div className="text-left w-100 m-1 ">
                      <h3>Items</h3>
                      {order.orderItems.map((item) => {
                        return (
                          <div>
                            <p>
                              {item.name} - {item.portion} * {item.quantity} *{" "}
                              {item.prices[0][item.portion]}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    <div className="text-left w-100 m-1">
                      <h3>Address</h3>
                      <p>Street: {order.shippingAddress.street}</p>
                      <p>City: {order.shippingAddress.city}</p>
                      <p>Country: {order.shippingAddress.country}</p>
                      <p>Zip: {order.shippingAddress.zip}</p>
                    </div>
                    <div className="text-left w-100 m-1">
                      <h3>Order Info</h3>
                      <p>
                        <b>Price: {order.orderAmount}</b>
                      </p>
                      <p>Date: {order.createdAt.substring(0, 10)}</p>
                      <p>{order.note && <span>Comment: {order.note}</span>}</p>
                    </div>
                    <div className="text-left w-100 m-1">
                      <h3>Order Status</h3>
                      {}
                      <p
                        className={`order-stat-item  ${
                          order.status === "Order placed" ? "actual-stat" : ""
                        }`}
                      >
                        <i className="fa-solid fa-clipboard order-stat-icon"></i>{" "}
                        <span className="ml-2">Order placed</span>
                      </p>
                      <p
                        className={`order-stat-item  ${
                          order.status === "Order confirmed"
                            ? "actual-stat"
                            : ""
                        }`}
                      >
                        <i className="fa-solid fa-clipboard-check order-stat-icon"></i>{" "}
                        <span className="ml-2">Order confirmed</span>
                      </p>
                      <p
                        className={`order-stat-item  ${
                          order.status === "Preparation" ? "actual-stat" : ""
                        }`}
                      >
                        <i className="fa-solid fa-bowl-food order-stat-icon"></i>{" "}
                        <span className="ml-2">Preparation</span>
                      </p>
                      <p
                        className={`order-stat-item  ${
                          order.status === "Delivery" ? "actual-stat" : ""
                        }`}
                      >
                        <i className="fa-solid fa-truck order-stat-icon"></i>{" "}
                        <span className="ml-2">Delivery</span>
                      </p>
                      <p
                        className={`order-stat-item  ${
                          order.status === "Completed" ? "actual-stat" : ""
                        }`}
                      >
                        <i className="fa-solid fa-face-smile order-stat-icon"></i>{" "}
                        <span className="ml-2">Completed</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        <h1 className="mt-5">Previous Orders</h1>
        {orders &&
          orders.map((order) => {
            if (order.isDelivered) {
              return (
                <div className="col-md-12 shadow-sm p-4 mb-3 rounded order-card">
                  <div className="flex-container w-100">
                    <div className="text-left w-100 m-1 ">
                      <h3>Items</h3>
                      {order.orderItems.map((item) => {
                        return (
                          <div key={item.id}>
                            <p>
                              {item.name} - {item.portion} * {item.quantity} *{" "}
                              {item.prices[0][item.portion]}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    <div className="text-left w-100 m-1">
                      <h3>Address</h3>
                      <p>Street: {order.shippingAddress.street}</p>
                      <p>City: {order.shippingAddress.city}</p>
                      <p>Country: {order.shippingAddress.country}</p>
                      <p>Zip: {order.shippingAddress.zip}</p>
                    </div>
                    <div className="text-left w-100 m-1">
                      <h3>Order Info</h3>
                      <p>
                        <b>Price: {order.orderAmount}</b>
                      </p>
                      <p>Date: {order.createdAt.substring(0, 10)}</p>
                      <p>{order.note && <span>Comment: {order.note}</span>}</p>
                    </div>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

OrdersScreen.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(OrdersScreen);
