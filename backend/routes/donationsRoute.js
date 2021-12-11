const express = require("express");
const router = express.Router();
const Donation = require("../models/donationModel")

router.get("/getalldonation", async (req, res) => {
  try {
    const donation = await Donation.find();
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

router.post("/editdonation", async (req, res) => {
  try {
    const donation = await Donation.findOne({ _id: req.body._id });

    donation.idUsuario = req.body.idUsuario;
    donation.value = req.body.value;
    donation.anonymous = req.body.anonymous;
    donation.type_payment = req.body.type_payment;
    donation.reverse = req.body.reverse;
    donation.status = req.body.status;
    donation.date = req.body.date;

    await donation.save();

    res.send("Donation details updated successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/deletedonation", async (req, res) => {
  try {
    await Donation.findOneAndDelete({ _id: req.body._id });

    res.send("Donation deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
