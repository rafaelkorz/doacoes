const express = require("express");
const router = express.Router();
const User = require("../../models/userModel")
const { sendEmail } = require("../../helpers/mailer")
const { registerToken } = require("../../helpers/auth")

router.post("/login", async(req, res) => {
const { username , password } = req.body

  try {
    const user = await User.findOne({username})

    if (user) {
      const isMatch = await user.isValidPassword(password)
      if (!isMatch) {
        res.json({state: 1, message:"Username/password not valid"})
      } else if (user.activate_email) {        
        res.json(registerToken(user))
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

      sendEmail(name, email, cpf);

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

module.exports = router

