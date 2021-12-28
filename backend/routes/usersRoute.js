const express = require("express");
const router = express.Router();
const User = require("../models/userModel")
const jwt = require("jsonwebtoken");

let refreshTokens = [];

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, "mySecretKey", {
    expiresIn: "15s",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, "myRefreshSecretKey");
};

router.post("/login", async(req, res) => {
const { username , password } = req.body

  try {
    const user = await User.findOne({username , password})
    if(user) {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      refreshTokens.push(refreshToken);
      res.json({
        ...user.toObject(),
        accessToken,
        refreshToken,
      });
      // res.send(user)
    } else {
      res.status(400).json("Username or password incorrect!");
    }
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/register", async(req, res) => {
  try {
    const newUser = new User(req.body)
    await newUser.save()
    res.send(newUser)
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/refresh", (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
    return res.status(401).json("You are not authenticated!");
  } 
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }

  jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
});

router.post("/logout", (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json("You logged out successfully.");
});


module.exports = router

