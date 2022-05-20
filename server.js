const express = require("express");
const path = require("path");
const cors = require("cors");
const http = require("http");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

// Connect Database
const db = require("./db.js");

// Init Middleware
app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

// Define Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/items/", require("./routes/itemsRoute"));
app.use("/api/users/", require("./routes/userRoute"));
app.use("/api/orders/", require("./routes/ordersRoute"));

// Socket.io
const io = require("socket.io")(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});
io.on("connection", (socket) => {
  // console.log(socket);
  // console.log("Connection established!");
  // socket.on("disconnect", function () {
  //   console.log("Client Disconnected");
  // });
  socket.on("update order status", () => {
    socket.emit("update order status");
    socket.broadcast.emit("update order status");
  });
  socket.on("place order", () => {
    socket.emit("place order");
    socket.broadcast.emit("place order");
  });
});
io.listen(5000);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
