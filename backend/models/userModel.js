const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String , required: true },
  email: { type: String , required: true, unique: true},
  cpf: { type: String , required: true, unique: true},
  phone: { type: String },
  adm: { type: Boolean, default: false },
  username : { type: String , required: true},
  password : { type: String , required: true},
  stripe_custumer_id: { type: String, default: '' },
},{ timestamps : true })

const userModel = mongoose.model('users' , userSchema)

module.exports = userModel;