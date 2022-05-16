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
  const { orders, numberOfPages, loading, error } = getOrdersState;

  const [pageNumber, setPageNumber] = useState(0);
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  useEffect(() => {
    dispatch(getAllOrders(pageNumber));
  }, [dispatch, pageNumber]);

  const socket = openSocket("http://localhost:5000");

  useEffect(() => {
    socket.on("update order status", () => {
      dispatch(getAllOrders(pageNumber));
    });
    socket.on("place order", () => {
      dispatch(getAllOrders(pageNumber));
    });
  });

  return (
    <div>
      {loading && <Loading />}
      {error && <Error error="something went wrong" />}
      <div className="d-flex pagination">
        <div>
          <button className="btn-paging " onClick={goToPrevious}>
            Previous
          </button>
          {pages.map((pageIndex) => {
            return (
              <button
                key={pageIndex}
                className={`btn-paging numbers ${
                  pageIndex === pageNumber ? "active" : ""
                }`}
                onClick={() => setPageNumber(pageIndex)}
              >
                {pageIndex + 1}
              </button>
            );
          })}
          <button className="btn-paging" onClick={goToNext}>
            Next
          </button>
        </div>
      </div>
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
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.email}</td>
                  <td>{order.userId}</td>
                  <td>{order.orderAmount}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>
                    {order.isDelivered ? (
                      <p>Order delivered</p>
                    ) : (
                      <select
                        className="form-select order-status-select"
                        // aria-label="Default select example"
                        onChange={(e) => {
                          console.log(e, "onChange");
                          dispatch(deliverOrder(order._id, e.target.value));
                          socket.emit("update order status");
                        }}
                      >
                        <option selected>{order.status}</option>
                        <option value="Order placed">Order placed</option>
                        <option value="Order confirmed">Order confirmed</option>
                        <option value="Preparation">Preparation</option>
                        <option value="Delivery">Delivery</option>
                        <option value="Complete">Complete</option>
                      </select>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );

  function goToPrevious() {
    setPageNumber(Math.max(0, pageNumber - 1));
  }
  function goToNext() {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  }
}
