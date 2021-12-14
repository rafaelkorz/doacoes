const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
    idUsuario : { type : mongoose.Schema.Types.ObjectID , ref:'users'},      
    value: { type: Number , required: true },
    anonymous: { type: Boolean },
    type_payment: { type: Number , required: true },
    reverse: { type: Boolean },
    status : { type: Number },
  },{ timestamps : true })

const donationModel = mongoose.model('donation' , donationSchema)

module.exports = donationModel;