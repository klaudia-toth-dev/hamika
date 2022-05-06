// const express = require("express");

// const Item = require("./models/itemModel");
// const User = require("./models/userModel");

// const app = express();
// const db = require("./db.js");

// app.use(express.json());

// const itemsRoute = require("./routes/itemsRoute");
// const userRoute = require("./routes/userRoute");
// const ordersRoute = require("./routes/ordersRoute");

// app.use("/api/items/", itemsRoute);
// app.use("/api/users/", userRoute);
// app.use("/api/orders/", ordersRoute);

// app.get("/", (req, res) => {
//   res.send("Server working on port " + port);
// });

// const port = process.env.PORT || 8000;

// app.listen(port, () => "Server running");
const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const helmet = require("helmet");

const app = express();

// Connect Database
const db = require("./db.js");

// connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(helmet());

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));

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
