// const Item = require("./models/itemModel");
// const User = require("./models/userModel");
// app.use(express.json());

const express = require("express");
const path = require("path");
const helmet = require("helmet");

const app = express();

// Connect Database
const db = require("./db.js");

// Init Middleware
app.use(express.json({ extended: false }));
app.use(helmet());

// Define Routes
// app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
// app.use("/api/profile", require("./routes/api/profile"));
const itemsRoute = require("./routes/itemsRoute");
const userRoute = require("./routes/userRoute");
const profile = require("./routes/api/profile");
const ordersRoute = require("./routes/ordersRoute");

app.use("/api/items/", itemsRoute);
// app.use("/api/profile/", profile);
app.use("/api/users/", userRoute);
app.use("/api/orders/", ordersRoute);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
