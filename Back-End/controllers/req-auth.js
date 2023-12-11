const CustomAPIError = require('../errors/custom-error')
const {StatusCodes} = require('http-status-codes')
const Products = require('../models/products')
const User = require('../models/users')
const paypal = require('@paypal/checkout-server-sdk')

const Environment = process.env.NODE_ENV === 'production' ?
paypal.core.LiveEnvironment:
paypal.core.SandboxEnvironment
const paypalClient = new paypal.core.PayPalHttpClient(new Environment(process.env.CLIENT_ID, process.env.PAYPAL_ACCESS_TOKEN))

const addProduct = async (req,res)=>{
  const {admin, userId} = req.user
  if(!admin){
    throw new CustomAPIError('this user has no access to this route', StatusCodes.UNAUTHORIZED)
  }
  req.body.createdBy = userId
  const product = await Products.create(req.body)
  res.status(StatusCodes.CREATED).json({product})
}

const modifyProduct = async (req, res)=>{
  const {params:{id},user:{admin}} = req
  if (!admin){
    throw new CustomAPIError('this user has no access to this route', StatusCodes.UNAUTHORIZED)
  }
  const product = await Products.findByIdAndUpdate({_id:id},req.body,{new:true,runValidators:true})
  res.status(StatusCodes.OK).json({product})
}


const deleteProduct = async(req, res)=>{
  
}

const addProductToWishList = async (req, res)=>{

}

const getWishListProducts = async(req, res)=>{

}

const deleteWishlistedProduct = async (req,res)=>{

}


                    






module.exports = {
  addProduct,
  deleteProduct,
  modifyProduct,
  addProductToWishList,
  getWishListProducts,
  deleteWishlistedProduct,
}