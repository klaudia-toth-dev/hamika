const express = require("express");

const Item = require("./models/itemModel");
const User = require("./models/userModel");

const app = express();
const db = require("./db.js");

var cors = require("cors");

app.use(cors());

app.use(express.json());

const itemsRoute = require("./routes/itemsRoute");
const userRoute = require("./routes/userRoute");
const ordersRoute = require("./routes/ordersRoute");

app.use("/api/items/", itemsRoute);
app.use("/api/users/", userRoute);
app.use("/api/orders/", ordersRoute);

app.get("/", (req, res) => {
  res.send("Server working on port " + port);
});

const port = process.env.PORT || 8000;

app.listen(port, () => "Server running");
