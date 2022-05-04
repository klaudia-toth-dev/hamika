const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51Kk7pWG0zk4XrIkWhPms0w6Zt5SbrQ6B02bb8U0wcY2IJPutPZz3gQgwiPaj44vD9thEJCxPUJtKct2ckLVzDowf00FGhHT65f"
);
const Order = require("../models/orderModel");

router.post("/placeorder", auth, async (req, res) => {
  const { token, subtotal, currentUser, cartItems, note } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: subtotal * 100,
        currency: "huf",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      const neworder = new Order({
        name: currentUser.name,
        email: currentUser.email,
        userId: currentUser._id,
        orderItems: cartItems,
        orderAmount: subtotal,
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          zip: token.card.address_zip,
        },
        transactionId: payment.source.id,
        note: note,
      });

      neworder.save();
      res.send("Order placed successfully");
    } else {
      res.send("Payment failed");
    }
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" + error });
  }
});

router.post("/getuserorders", auth, async (req, res) => {
  const { userId } = req.body;
  try {
    const orders = await Order.find({ userId: userId }).sort({ _id: -1 });
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});
module.exports = router;

router.get("/getallorders", auth, async (req, res) => {
  try {
    const orders = await Order.find({});
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});
module.exports = router;

// router.post("/deliverorder", async (req, res) => {
//   const orderId = req.body.orderId;
//   try {
//     const order = await Order.findOne({ _id: orderId });
//     order.isDelivered = true;
//     await order.save();
//     res.send("Order Delivered Successfully");
//   } catch (error) {
//     return res.status(400).json({ message: "Something went wrong" });
//   }
// });
