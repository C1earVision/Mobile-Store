const User = require('../models/users')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')

const auth = async (req,res,next)=>{

}

module.exports = auth