import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";
// import data from "../data";

export default function Item({ item }) {
  const [quantity, setQuantity] = useState(1);
  const [portion, setPortion] = useState("small");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  function addtocart() {
    dispatch(addToCart(item, quantity, portion));
  }

  return (
    <div className="m-2 shadow p-3 mb-5 bg-white rounded">
      <div onClick={handleShow}>
        <h1>{item.name}</h1>
        <img src={item.image} className="img-fluid item-image" alt="item" />
      </div>
      <div className="flex-container">
        <div className="m-1 w-100 item-portions">
          <p>Portions</p>
          <select
            className="form-control"
            value={portion}
            onChange={(e) => {
              setPortion(e.target.value);
            }}
          >
            {item.portions.map((portion) => {
              return <option value={portion}>{portion}</option>;
            })}
          </select>
        </div>
        <div className="m-1 w-100 item-quantity">
          <p>Quantity</p>
          <select
            className="form-control"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          >
            {[...Array(10).keys()].map((x, i) => {
              return <option value={i + 1}>{i + 1}</option>;
            })}
          </select>
        </div>
      </div>
      <div className="flex-container">
        <div className="item-price m-1 w-100">
          <h1 className="mt-1">
            Price: {item.prices[0][portion] * quantity} Ft
          </h1>
        </div>
        <div className="item-add-cart m-1 w-100">
          <button type="button" className="btn" onClick={addtocart}>
            ADD TO CART
          </button>
        </div>
      </div>

      {/* MODAL */}
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>{item.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <img
            src={item.image}
            alt="item"
            className="item-modal-img img-fluid"
          />
          <p>{item.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <button type="button" className="btn" onClick={handleClose}>
            CLOSE
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
