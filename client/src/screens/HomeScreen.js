import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems } from "../actions/itemActions";
import data from "../data";
import Item from "../components/Item";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Filter from "../components/Filter";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const itemsState = useSelector((state) => state.getAllItemsReducer);
  const { items, error, loading } = itemsState;

  useEffect(() => {
    dispatch(getAllItems());
  }, []);

  return (
    <div>
      <Filter />
      <div className="row justify-content-center">
        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}
        {items &&
          items.map((item) => {
            return (
              <div className="col-md-4 my-3" key={item._id}>
                <div>
                  <Item item={item} />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
