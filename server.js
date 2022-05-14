const express = require("express");
const path = require("path");
const helmet = require("helmet");

const app = express();

// Connect Database
const db = require("./db.js");

// Init Middleware
app.use(express.json({ extended: false }));
// app.use(helmet());
// app.use(
//   helmet.contentSecurityPolicy({
//     useDefaults: true,
//     directives: {
//       "img-src": ["'self'", "https: data:"],
//       "script-src": ["'self'", "https: data:"],
//     },
//   })
// );
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'"],
      "script-rc": ["'self'"],
      "style-src": [
        "'self'",
        "https://fonts.googleapis.com",
        "'unsafe-inline'",
      ],
      "img-src": ["'self'", "data:"],
      "connect-src": [
        "'self'",
        "https://ourDomain.us.auth0.com/oauth/token",
        "https://ourDomain.azure-api.net/fields/request/paths/invoke",
      ],
      "font-src": ["'self'", "https://fonts.gstatic.com"],
      "object-src": ["'self'"],
      "media-src": ["'self'"],
      "frame-src": ["'self'", "ourDomain.us.auth0.com"],
    },
  })
);

// Define Routes
app.use("/api/auth", require("./routes/api/auth"));
const itemsRoute = require("./routes/itemsRoute");
const userRoute = require("./routes/userRoute");
// const profile = require("./routes/api/profile");
const ordersRoute = require("./routes/ordersRoute");

app.use("/api/items/", itemsRoute);
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
