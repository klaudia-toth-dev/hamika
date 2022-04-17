import React from "react";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { placeOrder } from "../actions/orderActions";
import Loading from "../components/Loading";
import Success from "../components/Success";
import Error from "../components/Error";
export default function CheckOut({ subtotal }) {
  const orderState = useSelector((state) => state.placeOrderReducer);
  const { loading, error, success } = orderState;

  const dispatch = useDispatch();
  function tokenHandler(token) {
    console.log(token);
    dispatch(placeOrder(token, subtotal));
  }
  console.log(subtotal);
  return (
    <div>
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      {success && <Success success="Your order placed successfully" />}

      <StripeCheckout
        amount={subtotal * 100}
        shippingAddress
        billingAddress
        token={tokenHandler}
        currency="HUF"
        stripeKey="pk_test_51Kk7pWG0zk4XrIkWJwJMRKQydK14u27CeVSQk3bQDcbbcBuuzQSnMDpt4tIvB01XxaiNEKFYjQWtpNm6g74keKnd00qhAvlqU5"
      >
        <button className="btn">Pay Now</button>
      </StripeCheckout>
    </div>
  );
}
