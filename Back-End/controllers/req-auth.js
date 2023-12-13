const CustomAPIError = require('../errors/custom-error')
const {StatusCodes} = require('http-status-codes')
const Products = require('../models/products')
const User = require('../models/users')
const ProductsUsed = require('../models/productsUsed')

const addProduct = async (req,res)=>{
  const {admin, userId} = req.user
  const {used} = req.query
  const user = await User.findById({_id:userId}) 
  if(!admin){
    throw new CustomAPIError('this user has no access to this route', StatusCodes.UNAUTHORIZED)
  }
  req.body.createdBy = userId
  used === 'true' ? req.body.soldBy = user.name : null
  const product = used === 'true' ? await ProductsUsed.create(req.body) : await Products.create(req.body)
  res.status(StatusCodes.CREATED).json({product})
}

const modifyProduct = async (req, res)=>{
  const {params:{id},user:{admin}} = req
  const {used} = req.query
  if (!admin){
    throw new CustomAPIError('this user has no access to this route', StatusCodes.UNAUTHORIZED)
  }
  const product = used === 'true' ? await ProductsUsed.findByIdAndUpdate({_id:id},req.body,{new:true,runValidators:true}) : await Products.findByIdAndUpdate({_id:id},req.body,{new:true,runValidators:true})
  res.status(StatusCodes.OK).json({product})
}


// Products.deleteOne
const deleteProduct = async(req, res)=>{
  const {params:{id},user:{admin}, query:{used}} = req
  if (!admin) {
    throw new CustomAPIError('this user has no access to this route', StatusCodes.UNAUTHORIZED)
  }
  const product = used === 'true' ? await ProductsUsed.findByIdAndDelete({_id:id}) : await Products.findByIdAndDelete({_id:id})
  res.status(StatusCodes.OK).json({product})
}

const addProductToWishList = async (req, res)=>{
  const {params:{id}, user:{userId}, query:{used}} = req
  let product = used === 'true' ? await ProductsUsed.findOne({_id:id}) : await Products.findOne({_id:id})
  if(product.wishListedBy.includes(userId)){
    throw new CustomAPIError('user already has the book in library', StatusCodes.BAD_REQUEST)
  }
  product = used === 'true' ? await ProductsUsed.findOneAndUpdate({_id:id},{ $push: {wishListedBy:userId} }, { new: true, runValidators: true }) :await Products.findOneAndUpdate({_id:id},{ $push: {wishListedBy:userId} }, { new: true, runValidators: true })
  res.status(StatusCodes.OK).json({product})
}

const getWishListProducts = async(req, res)=>{
  const {user:{userId}, query:{used}} = req
  const Products = await products.find({wishListedBy:userId})
  res.status(StatusCodes.OK).json({Products})
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