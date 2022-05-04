import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../actions/orderActions";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function OrdersScreen() {
  const userState = useSelector((state) => state.authReducer);
  const { currentUser } = userState;

  const dispatch = useDispatch();

  const orderState = useSelector((state) => state.getUserOrdersReducer);
  const { orders, error, loading } = orderState;

  console.log(orderState.note, "note");

  useEffect(() => {
    if (currentUser && currentUser.isAdmin) {
      window.location.href = "/admin";
    }
    dispatch(getUserOrders());
  }, []);
  return (
    <div className="order-screen">
      <h1>My Orders</h1>
      <div className="row ">
        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}
        {orders &&
          orders.map((order) => {
            return (
              <div className="col-md-12 shadow-sm p-4 mb-5 rounded order-card">
                <div className="flex-container w-100">
                  <div className="text-left w-100 m-1 ">
                    <h3>Items</h3>
                    {order.orderItems.map((item) => {
                      return (
                        <div>
                          <p>
                            {item.name} - {item.portion} * {item.quantity} *{" "}
                            {item.price}{" "}
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
                    {/* <p>Order Id: {order._id}</p> */}
                    <p>{order.note && <span>Comment: {order.note}</span>}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
