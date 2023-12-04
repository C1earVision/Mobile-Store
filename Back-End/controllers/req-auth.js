const CustomAPIError = require('../errors/custom-error')
const {StatusCodes} = require('http-status-codes')
const Products = require('../models/products')
const User = require('../models/users')


const addProduct = async (req,res)=>{
  const book = await Books.create(req.body)
  res.status(StatusCodes.CREATED).json({book})
}

const modifyProduct = async (req, res)=>{

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
  deleteWishlistedProduct
}