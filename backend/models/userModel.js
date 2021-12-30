const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String , required: true },
  email: { type: String , required: true, unique: true},
  cpf: { type: String , required: true, unique: true},
  phone: { type: String },
  adm: { type: Boolean, default: false },
  activate_email: { type: Boolean, default: false },
  username : { type: String , required: true},
  password : { type: String , required: true},
  stripe_custumer_id: { type: String, default: '' },
},{ timestamps : true })

userSchema.pre('save', async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(this.password, salt)
      this.password = hashedPassword
    }
    next()
  } catch (error) {
    next(error)
  }
})

userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw error
  }
}

const userModel = mongoose.model('users' , userSchema)

module.exports = userModel;