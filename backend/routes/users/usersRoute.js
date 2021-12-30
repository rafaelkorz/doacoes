const express = require("express");
const router = express.Router();
const User = require("../../models/userModel")
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")
const path = require("path");

let refreshTokens = [];

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: "15s" });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET);
};

router.post("/login", async(req, res) => {
const { username , password } = req.body

  try {
    const user = await User.findOne({username})

    if (user) {
      const isMatch = await user.isValidPassword(password)
      if (!isMatch) {
        res.json({state: 1, message:"Username/password not valid"})
      } else if (user.activate_email) {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
  
        refreshTokens.push(refreshToken);
        res.json({
          ...user.toObject(),
          accessToken,
          refreshToken,
        });
      } else {
        res.json({state: 1, message: "Please, active your account!"});
      }  
    } else {
      res.json({state: 1, message:"User not registered!" });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/register", (req, res) => {
  try {
    const { name, email, cpf } = req.body;
    User.findOne({email}).exec( async (err, user) => {
      if (user) {
        return res.json({ state: 1, message: "User with this email already exists"});
      }

      const token = jwt.sign({name, email, cpf}, process.env.JWT_ACC_ACTIVATE, { expiresIn: '5m' });

      const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
      })

      await transport.sendMail({
        from: process.env.MAIL_FROM,
        to: email,
        subject: 'Account activation Link',
        html: ` 
            <h2>Please click on given link to activate you account</h2>
            <a href=${process.env.CLIENT_URL}/api/users/authentication/active/${token}>Click here to activate your account</a>
          `})

      const newUser = new User(req.body)
      newUser.save((err, success) => {
        if (err) {
          console.log("Error in Signup ", err);
          return res.status(400).json({ error: err });
        }
        res.json({
          state: 2,
          message: 'Email has been sent, please activate your account'
        })
      })
    })

  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/authentication/active/:token", (req, res) => {
  const token = req.params.token;
  if (token) {
    jwt.verify(token, process.env.JWT_ACC_ACTIVATE, async (err, decodedToken) => {
      if (err) {
        return res.status(400).json({ error: "Something went Incorrect or Expired link" })    
      }
      const {name, email, cpf} = decodedToken;

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

  if (!refreshToken) {
    return res.status(401).json("You are not authenticated!");
  } 
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
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

