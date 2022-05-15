import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import { getAllOrders } from "../../../actions/orderActions";
import { deliverOrder } from "../../../actions/orderActions";

export default function AdminOrders() {
  const dispatch = useDispatch();

  const getOrdersState = useSelector((state) => state.getAllOrdersReducer);
  const { orders, numberOfPages, loading, error } = getOrdersState;

  const [pageNumber, setPageNumber] = useState(0);
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  useEffect(() => {
    dispatch(getAllOrders(pageNumber));
  }, [dispatch, pageNumber]);

  return (
    <div>
      {/* <h1>Orders List</h1> */}
      {loading && <Loading />}
      {error && <Error error="something went wrong" />}

      {/* {pages.map((pageIndex) => {
        <button>{pageIndex + 1}</button>;
      })} */}
      <div className="d-flex pagination">
        {/* <p>Page {pageNumber + 1}</p> */}
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
            {/* <th>Status</th> */}
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
                  {/* <td>
                    {order.isDelivered ? (
                      <p>Delivered</p>
                    ) : (
                      <button
                        className="btn"
                        onClick={() => {
                          dispatch(deliverOrder(order._id));
                        }}
                      >
                        Deliver
                      </button>
                    )}
                  </td> */}
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
