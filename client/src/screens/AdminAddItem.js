import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../actions/itemActions";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success";

export default function AdminAddItem() {
  const [name, setName] = useState("");
  const [smallprice, setSmallPrice] = useState("");
  const [mediumprice, setMediumPrice] = useState("");
  const [largeprice, setLargePrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const addItemState = useSelector((state) => state.addItemReducer);
  const { error, loading, success } = addItemState;

  function formHandler(e) {
    e.preventDefault();
    const item = {
      name,
      image,
      description,
      category,
      prices: { small: smallprice, medium: mediumprice, large: largeprice },
    };

    console.log(item);
    dispatch(addItem(item));
  }

  function getImageUrl(e) {
    console.log(e);
    let fieldId = e.split("/");
    setImage("https://drive.google.com/uc?export=view&id=" + fieldId[5]);
  }

  return (
    <div>
      <div className="text-left">
        <h1>Add Item</h1>

        {loading && <Loading />}
        {success && <Success success="New item added successfully" />}
        {error && <Error error="Something went wrong" />}

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
            placeholder="imageURL"
            className="form-control"
            value={image}
            onChange={(e) => {
              getImageUrl(e.target.value);
            }}
          />
          <button className="btn mt-3" type="submit">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
}
