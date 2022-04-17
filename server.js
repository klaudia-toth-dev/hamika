const express = require("express");

const Item = require("./models/itemModel");
const User = require("./models/userModel");

const app = express();
const db = require("./db.js");

//client
// const path = require("path");

console.log(process.env);

app.use(express.json());

//client
// app.use(express.static(path.join(__dirname, "client", "build")));

const itemsRoute = require("./routes/itemsRoute");
const userRoute = require("./routes/userRoute");
const ordersRoute = require("./routes/ordersRoute");

app.use("/api/items/", itemsRoute);
app.use("/api/users/", userRoute);
app.use("/api/orders/", ordersRoute);

app.get("/", (req, res) => {
  res.send("Server working on port " + port);
});

// app.get("/getitems", (req, res) => {
//   Item.find({}, (err, docs) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(docs);
//     }
//   });
// });

const port = process.env.PORT || 8000;

//client
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

app.listen(port, () => "Server running");
