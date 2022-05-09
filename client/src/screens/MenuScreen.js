import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems } from "../actions/itemActions";
import { Navigate } from "react-router-dom";

import Item from "../components/Item";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Filter from "../components/Filter";

export default function MenuScreen() {
  const userState = useSelector((state) => state.auth);
  const { user } = userState;

  const itemsState = useSelector((state) => state.getAllItemsReducer);
  const { items, error, loading } = itemsState;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllItems());
  }, []);

  if (user && user.isAdmin) {
    return <Navigate to="/auth/admin" />;
  }

  return (
    <div>
      <Filter />
      <div className="row justify-content-left">
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
