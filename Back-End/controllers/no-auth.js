const CustomAPIError = require('../errors/custom-error')
const {StatusCodes} = require('http-status-codes')
const Products = require('../models/products')
const products = require('../models/products')

const getAllProducts = async (req, res)=>{
  const {name, company, sort, numericFilters} = req.query
  const querys = {}
  if(name){
    querys.name = { $regex: name, $options: 'i'}
  }
  if(company){
    querys.company = company
  }
  let result = Products.find(querys)
  if(sort){
    sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  }else{
    result = result.sort('-createdAt')
  }

  const page = Number(req.query.page) || 1;
  const limit = 1;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result 
  res.status(200).json({countAll:Products.countDocuments(), count: products.length, products})
}

// id is inside params object
// products.findOne({})
const getProduct = async (req, res)=>{
  const {id} = req.params
  const product = await Products.findOne({_id:id})
  res.status(200).json({product})
}

module.exports = {
  getAllProducts,
  getProduct,
}