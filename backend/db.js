const mongoose = require("mongoose");
require('dotenv/config');

function connectDB(){
  mongoose.connect(process.env.APP_URL_DB , { useUnifiedTopology: true , useNewUrlParser: true })
  const connection = mongoose.connection
  connection.on('connected' , ()=>{
      console.log('Mongo DB Connection Successfull')
  })
  connection.on('error' , ()=>{
    console.log('Mongo DB Connection Error')
  })
}

connectDB()

module.exports = mongoose