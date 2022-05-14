import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import { getAllOrders } from "../../../actions/orderActions";
import { deliverOrder } from "../../../actions/orderActions";

// import io from "socket.io-client";

// const ENDPOINT = "http://localhost:8000";
// const socket = io.connect(ENDPOINT);

import openSocket from "socket.io-client";

export default function AdminOrders() {
  const dispatch = useDispatch();
  const getOrdersState = useSelector((state) => state.getAllOrdersReducer);
  const { orders, loading, error } = getOrdersState;
  const socket = openSocket("http://localhost:5000");

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  useEffect(() => {
    socket.on("update order status", () => {
      dispatch(getAllOrders());
    });
    socket.on("place order", () => {
      dispatch(getAllOrders());
    });
  });

  return (
    <div>
      {/* <h1>Orders List</h1> */}
      {loading && <Loading />}
      {error && <Error error="something went wrong" />}
      <table className="table styled-table">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Email</th>
            <th>User Id</th>
            <th>Price</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => {
              return (
                <tr>
                  <td>{order._id}</td>
                  <td>{order.email}</td>
                  <td>{order.userId}</td>
                  <td>{order.orderAmount}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>
                    {order.isDelivered ? (
                      <p>Delivered</p>
                    ) : (
                      <button
                        className="btn"
                        onClick={() => {
                          dispatch(deliverOrder(order._id));
                          console.log("before socket");
                          // socket.emit("example_message", "huhu");
                          socket.emit("update order status");
                          console.log("after socket");
                        }}
                      >
                        Deliver
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
