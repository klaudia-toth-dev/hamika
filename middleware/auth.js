const jwt = require("jsonwebtoken");

const secret = "test";

const auth = async (req, res, next) => {
  try {
    console.log(req.headers, "req");
    const token = req.headers.Authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
