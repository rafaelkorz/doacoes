const mongoose = require("mongoose");

function connectDB(){
    mongoose.connect('mongodb+srv://korz:korz@cluster0.2emxk.mongodb.net/doacoes_prod?retryWrites=true&w=majority' , {useUnifiedTopology: true , useNewUrlParser: true})
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