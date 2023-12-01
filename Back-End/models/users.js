const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  
})

userSchema.methods.createJWT = function (){

}

userSchema.pre('save', async function(){

})

userSchema.methods.comparePassword = async function (sentPass){

}




module.exports = mongoose.model('User', userSchema)
