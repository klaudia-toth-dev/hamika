import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems, deleteItem } from "../../../actions/itemActions";
import { Link } from "react-router-dom";

import Loading from "../../../components/Loading";
import Error from "../../../components/Error";

export default function AdminMenu() {
  const dispatch = useDispatch();
  const itemsState = useSelector((state) => state.getAllItemsReducer);
  const { items, error, loading } = itemsState;

  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);
  return (
    <div className="admin-menu">
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      <table className="table styled-table">
        <thead>
          <tr>
            <th className="name">Name</th>
            <th className="prices">Prices</th>
            <th className="category">Category</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items &&
            items.map((item) => {
              return (
                <tr>
                  <td>{item.name}</td>
                  <td>
                    {item.prices[0]["small"] && (
                      <div> Small: {item.prices[0]["small"]}</div>
                    )}
                    {item.prices[0]["medium"] && (
                      <div> Medium: {item.prices[0]["medium"]}</div>
                    )}
                    {item.prices[0]["large"] && (
                      <div> Large: {item.prices[0]["large"]}</div>
                    )}
                  </td>
                  <td>{item.category}</td>
                  <td>
                    <i
                      className="fa fa-trash m-2"
                      onClick={() => dispatch(deleteItem(item._id))}
                    ></i>
                    <Link to={`/auth/admin/edititem/${item._id}`} id={item._id}>
                      <i className="fa fa-edit m-2"></i>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
