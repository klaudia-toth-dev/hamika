const mongoose = require("mongoose");

require("dotenv").config();

// var mongoURL =
//   "mongodb+srv://clautoth:mnbASDpoi123@cluster0.hklbt.mongodb.net/hamika";

// mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

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
