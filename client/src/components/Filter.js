import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterItems } from "../actions/itemActions";

export default function Filter() {
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState("");
  const [category, setCategory] = useState("all");
  return (
    <div className="container">
      <div className="row justify-content-center shadow-lg p-3 mb-5 mt-5 bg-white rounded">
        <div className="col-md-3 w-100">
          <input
            type="text"
            className="form-control w-100"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            placeholder="Search..."
          ></input>
        </div>
        <div className="col-md-3 w-100">
          <select
            className="form-control w-100 mt-2"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="veg">Vegetarian</option>
            <option value="nonveg">Non Vegeterian</option>
          </select>
        </div>
        <div className="col-md-3 w-100">
          <button
            className="btn w-100 mt-2"
            onClick={() => {
              dispatch(filterItems(searchKey, category));
            }}
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
}
