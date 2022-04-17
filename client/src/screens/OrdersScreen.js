import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../actions/orderActions";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function OrdersScreen() {
  const dispatch = useDispatch();

  const orderState = useSelector((state) => state.getUserOrdersReducer);
  const { orders, error, loading } = orderState;

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);
  return (
    <div>
      <h2>My Orders</h2>
      <div className="row ">
        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}
        {orders &&
          orders.map((order) => {
            return (
              <div className="col-md-12 shadow-sm p-3 mb-5 rounded bg-white">
                <div className="flex-container w-100">
                  <div className="text-left w-100 m-1 ">
                    <h2>Items</h2>
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
                    <h2>Address</h2>
                    <p>Street: {order.shippingAddress.street}</p>
                    <p>City: {order.shippingAddress.city}</p>
                    <p>Country: {order.shippingAddress.country}</p>
                    <p>Zip: {order.shippingAddress.zip}</p>
                  </div>
                  <div className="text-left w-100 m-1">
                    <h2>Order Info</h2>
                    <p>Price: {order.orderAmount}</p>
                    <p>Date: {order.createdAt.substring(0, 10)}</p>
                    <p>Transaction Id: {order.transactionId}</p>
                    <p>Order Id: {order._id}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
