const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
      idUsuario : { type : mongoose.Schema.Types.ObjectID , ref:'users'},
      value: { type: Number , required: true },
      anonymous: { type: Boolean },
      type_payment: { type: String , required: true },
      reverse: { type: Boolean },
      status : { type: String },
    },
    {timestamps : true}
  )

const donationModel = mongoose.model('donation' , donationSchema)

module.exports = donationModel;