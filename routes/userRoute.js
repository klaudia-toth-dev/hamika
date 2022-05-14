const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const { GoogleAuth } = require("google-auth-library");
const googleOAuth = require("../middleware/googleOAuth");
const client = new GoogleAuth(process.env.GOOGLE_CLIENT_ID);

const User = require("../models/userModel");

router.get("/getallusers", auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  "/register",
  [
    check("firstName", "All of the fields are required").notEmpty(),
    check("lastName", "All of the fields are required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        firstName,
        lastName,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.TOKEN_KEY,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.status(201).json({
            token,
            success: true,
            isAdmin: user.isAdmin,
            message: "User created!",
            errors: [],
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.TOKEN_KEY,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.status(202).json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.post("/googleLogin", async (req, res) => {
  try {
    const code = req.body.data;
    const profile = await googleOAuth.getProfileInfo(code);

    const { email_verified, email } = profile;

    if (email_verified) {
      User.findOne({ email }).exec((err, user) => {
        if (user) {
          console.log(user, "user");
          const payload = {
            user: {
              id: user.id,
            },
          };
          jwt.sign(
            payload,
            process.env.TOKEN_KEY,
            {
              expiresIn: 360000,
            },
            (err, token) => {
              if (err) throw err;
              return res.status(202).json({ token });
            }
          );
        } else {
          console.log("no user");
          return res.status(400).json({
            errors: [
              { msg: "You are not registered user. Please sign up first!" },
            ],
          });
        }
      });
    }
  } catch (error) {
    console.log("error?", error);
    return res
      .status(400)
      .json({ errors: [{ msg: "Google login failed. Try again" }] });
  }
});

module.exports = router;
