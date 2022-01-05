const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel")
const path = require("path");
const { generateAccessToken, 
        generateRefreshToken, 
        getRefreshToken, 
        setRefreshToken,
        setRefreshTokenPush
      } = require("../../helpers/auth")

router.get("/active/:token", (req, res) => {
  const token = req.params.token;
  if (token) {
    jwt.verify(token, process.env.JWT_ACC_ACTIVATE, async (err, decodedToken) => {
      if (err) {
        return res.status(400).json({ error: "Something went Incorrect or Expired link" })    
      }
      const { name, email, cpf } = decodedToken;

      const user = await User.findOne({ name, email, cpf });
  
      user.activate_email = true;
  
      await user.save();

      return res.sendFile(path.join(__dirname + '/activateEmail.html'));
    })
  } else {
    return res.json({ error: "Something went wrong" })
  }
})

router.post("/refresh", (req, res) => {
  const refreshToken = req.body.token;
  let refreshTokens = getRefreshToken()

  if (!refreshToken) {
    return res.status(401).json("You are not authenticated!");
  } 

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    err && console.log(err);
    
    refreshTokens = refreshTokens.filter((token) => token != refreshToken);
    setRefreshToken(refreshTokens);
    
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    setRefreshTokenPush(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
});

router.post("/logout", (req, res) => {
  const refreshToken = req.body.token;
  let refreshTokens = getRefreshToken()

  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  setRefreshToken(refreshTokens);
  
  res.status(200).json("You logged out successfully.");
});

module.exports = router;