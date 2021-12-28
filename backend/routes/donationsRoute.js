const express = require("express");
const router = express.Router();
const Donation = require("../models/donationModel")
const User = require("../models/userModel")
const auth_middleware = require("../middlewares/auth.middleware");

router.get("/getalldonation", auth_middleware.verifyToken, async (req, res) => {
  try {      
    let user;

    donations = await Donation.find();

    let newDonation = donations.map( async (donation) => {
      await User.findOne({ _id: donation.idUsuario }).then((data) => user = data);
      return {...donation.toObject(), name: user.name}
    })
    
    Promise.all(newDonation).then((result) =>res.send(result))
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/getalldonationdates", auth_middleware.verifyToken, async (req, res) => {
  try {      
    let user;
    let donations;
    
    if (req.query.reverse === 'true') {
      donations = await Donation.find({
        createdAt:{ $gte: req.query.dt_start, $lte: req.query.dt_end},
        reverse: true });
    } else {
      donations = await Donation.find({
        createdAt:{ $gte: req.query.dt_start, $lte: req.query.dt_end}
      });
    }

    let newDonation = donations.map( async (donation) => {
      await User.findOne({ _id: donation.idUsuario }).then((data) => user = data);
      return {...donation.toObject(), name: user.name}
    })
    
    Promise.all(newDonation).then((result) =>res.send(result))
  
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/getalluserdonation/:id", auth_middleware.verifyToken, async (req, res) => {
  try {
    const donation = await Donation.find({ idUsuario: req.params.id });
    res.send(donation);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/adddonation", async (req, res) => {
  try {
    const newDonation = new Donation(req.body);    
    await newDonation.save();
    res.send("Donation added successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/editdonation/:id", auth_middleware.verifyToken, async (req, res) => {
  try {
    const donation = await Donation.findOne({ _id: req.params.id });

    const { idUsuario, value, anonymous, type_payment, reverse, status } = req.body;

    donation.idUsuario = idUsuario;
    donation.value = value;
    donation.anonymous = anonymous;
    donation.type_payment = type_payment;
    donation.reverse = reverse;
    donation.status = status;    

    await donation.save();

    res.send("Donation details updated successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/deletedonation", auth_middleware.verifyToken, async (req, res) => {
  try {
    await Donation.findOneAndDelete({ _id: req.body._id });

    res.send("Donation deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
