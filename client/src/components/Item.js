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
    setShow(false);
  }

  return (
    <div className="item-card">
      <div onClick={handleShow}>
        <div className="item-image-div">
          <img src={item.image} className="item-image" alt="item" />
        </div>
        <div className="item-card-content">
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>{item.prices[0][portion]} HUF</p>
        </div>
      </div>

      {/* MODAL */}
      <Modal show={show} centered size="md">
        <Modal.Body>
          <button
            type="button"
            className="btn item-modal-btn"
            onClick={handleClose}
          >
            X
          </button>
          <img
            src={item.image}
            alt="item"
            className="item-modal-img img-fluid"
          />
          <div className="item-modal-content">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <div className="flex-container item-amounts">
              <div className="w-100 item-portions">
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
              <div className="w-100 item-quantity">
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
            <div className="item-add-cart w-100">
              <button type="button" className="btn" onClick={addtocart}>
                ADD TO CART
                <span className="add-btn-price">
                  {item.prices[0][portion] * quantity} HUF
                </span>
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
