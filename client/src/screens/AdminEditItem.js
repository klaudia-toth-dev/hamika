import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItemById } from "../actions/itemActions";
import { useParams } from "react-router-dom";
import { editItem } from "../actions/itemActions";

import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success";

export default function AdminEditItem() {
  const [name, setName] = useState("");
  const [smallprice, setSmallPrice] = useState("");
  const [mediumprice, setMediumPrice] = useState("");
  const [largeprice, setLargePrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();

  const getItemByIdState = useSelector((state) => state.getItemByIdReducer);
  const { item, loading, error } = getItemByIdState;

  const editItemState = useSelector((state) => state.editItemReducer);
  const { editSuccess, editLoading, editError } = editItemState;

  useEffect(() => {
    if (item) {
      if (item._id === id) {
        setName(item.name);
        setDescription(item.description);
        setCategory(item.category);
        setSmallPrice(item.prices[0]["small"]);
        setMediumPrice(item.prices[0]["medium"]);
        setLargePrice(item.prices[0]["large"]);
        setImage(item.image);
      } else {
        dispatch(getItemById(id));
      }
    } else {
      dispatch(getItemById(id));
    }
  }, [item, dispatch]);

  function formHandler(e) {
    e.preventDefault();
    const editedItem = {
      _id: id,
      name,
      image,
      description,
      category,
      prices: { small: smallprice, medium: mediumprice, large: largeprice },
    };

    dispatch(editItem(editedItem));
  }

  return (
    <div>
      <h1>{id}</h1>

      <div className="text-left">
        <h1>Edit Item</h1>

        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}
        {editSuccess && <Success success="Item edited successfully" />}
        {editLoading && <Loading />}

        <form onSubmit={formHandler}>
          <input
            type="text"
            placeholder="name"
            className="form-control"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="small portion price"
            className="form-control"
            value={smallprice}
            onChange={(e) => {
              setSmallPrice(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="medium portion price"
            className="form-control"
            value={mediumprice}
            onChange={(e) => {
              setMediumPrice(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="large portion price"
            className="form-control"
            value={largeprice}
            onChange={(e) => {
              setLargePrice(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="category"
            className="form-control"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="description"
            className="form-control"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="image"
            className="form-control"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
          <button className="btn mt-3" type="submit">
            Edit Item
          </button>
        </form>
      </div>
    </div>
  );
}
