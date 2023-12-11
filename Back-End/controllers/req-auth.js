const CustomAPIError = require('../errors/custom-error')
const {StatusCodes} = require('http-status-codes')
const Products = require('../models/products')
const User = require('../models/users')
const ProductsUsed = require('../models/productsUsed')

const addProduct = async (req,res)=>{
  const {admin, userId} = req.user
  const {used} = req.query
  const user = User.findById({_id:userId}) 
  if(!admin){
    throw new CustomAPIError('this user has no access to this route', StatusCodes.UNAUTHORIZED)
  }
  req.body.createdBy = userId
  if(used){
    console.log(user.name)
    req.body.soldBy = user.name
    const product = await ProductsUsed.create(req.body)
    res.status(StatusCodes.CREATED).json({product})
  }
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