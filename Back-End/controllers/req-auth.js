const CustomAPIError = require('../errors/custom-error')
const {StatusCodes} = require('http-status-codes')
const Products = require('../models/products')
const User = require('../models/users')
const ProductsUsed = require('../models/productsUsed')

const addProduct = async (req,res)=>{
  const {admin, userId} = req.user
  const {used} = req.query
  const user = await User.findById({_id:userId}) 
  if(!admin && !used){
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
    throw new CustomAPIError('user already has the product in cart', StatusCodes.BAD_REQUEST)
  }
  product = used === 'true' ? await ProductsUsed.findOneAndUpdate({_id:id},{ $push: {wishListedBy:userId} }, { new: true, runValidators: true }) :await Products.findOneAndUpdate({_id:id},{ $push: {wishListedBy:userId} }, { new: true, runValidators: true })
  res.status(StatusCodes.OK).json({product})
}

const getWishListProducts = async(req, res)=>{
  const {user:{userId}, query:{used}} = req
  const products = used ==='true'? await ProductsUsed.find({wishListedBy:userId}) : await Products.find({wishListedBy:userId})
  res.status(StatusCodes.OK).json({products})
}

const deleteWishlistedProduct = async (req,res)=>{
  const {params:{id:productId}, query:{used}, user:{userId}} = req
  let product = used === 'true' ? await ProductsUsed.findOne({_id:productId})  : await Products.findOne({_id:productId})
  if(!product.wishListedBy.includes(userId)){
    throw new CustomAPIError('this product doesnt exist in your cart', StatusCodes.BAD_REQUEST)
  }
  const index = product.wishListedBy.indexOf(userId);
  product.wishListedBy.splice(index, 1)
  product = used === 'true' ? await ProductsUsed.findByIdAndUpdate({_id:productId},{wishListedBy: product.wishListedBy}, { new: true, runValidators: true }) : await Products.findByIdAndUpdate({_id:productId},{wishListedBy: product.wishListedBy}, { new: true, runValidators: true })
  res.status(StatusCodes.OK).json({product})
}

// easy
const getUser = async (req, res)=>{
  const {id} = req.params
  const user = await User.findById({_id:id})
  res.status(StatusCodes.OK).json({user})
}

const updateProfilePicture = async (req, res)=>{
  const {params:{id}, body:{img}} = req
  const user = await User.findByIdAndUpdate({_id:id}, {img}, { new: true, runValidators: true })
  res.status(StatusCodes.OK).json({user})
}

const addComment = async (req,res)=>{
  const {user:{userId, name},query:{used},params:{id}} = req
  const content = req.body.content // the comment btw
  const user_stars = req.body.stars
  
  let product = used === 'true' ? await ProductsUsed.findOne({_id:id})  : await Products.findOne({_id:id})
  if(product.comments.some(comment => comment.userId === userId)){
    // Temporarly disabled for testing
    throw new CustomAPIError('User has already made a review before', StatusCodes.BAD_REQUEST)
  }

  //? O(1) Algorithm to get Average Stars
  let reviews = product.comments.length
  let avg = product.stars
  let sum = reviews*avg //? avg = sum/reviews so sum = avg * reviews

  // Update the Avg Stars and comments
  product = await product.updateOne({$set: { stars: (sum+user_stars)/(reviews+1) } ,$push: {comments:{userId, name, content, user_stars}} }, { new: true, runValidators: true }) 
  res.status(StatusCodes.CREATED).json({product})
}

module.exports = {
  addProduct,
  deleteProduct,
  modifyProduct,
  addProductToWishList,
  getWishListProducts,
  deleteWishlistedProduct,
  getUser,
  updateProfilePicture,
  addComment
}