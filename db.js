const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

var db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongo DB Connection Successful");
});
db.on("error", () => {
  console.log("Mongo DB Connection Failed");
});

module.exports = mongoose;
