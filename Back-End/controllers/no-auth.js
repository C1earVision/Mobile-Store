const CustomAPIError = require('../errors/custom-error')
const {StatusCodes} = require('http-status-codes')
const Products = require('../models/products')
const ProductsUsed = require('../models/productsUsed')

const getAllProducts = async (req, res)=>{
  let {name, company, sort, limit, used} = req.query
  const querys = {}
  if(name){
    querys.name = { $regex: name, $options: 'i'}
  }
  if(company){
    querys.company = company
  }
  let result = used ==='true' ?  ProductsUsed.find(querys) : Products.find(querys)
  if(sort){
    sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  }else{
    result = result.sort('-createdAt')
  }

  const page = Number(req.query.page) || 1;
  if(!limit){
    limit = 12
  }
  let skip = (page - 1) * parseInt(limit);
  result = result.skip(skip).limit(parseInt(limit));

  const products = await result 
  const countAll = used ==='true' ? await ProductsUsed.count() : await Products.count()
  res.status(200).json({countAll, count: products.length, products})
}

// id is inside params object
// products.findOne({})
let getProduct = async (req, res)=>{
  const {id} = req.params
  const {used} = req.query
  const product = used === 'true' ? ProductsUsed.findOne({_id:id})  : await Products.findOne({_id:id})
  res.status(200).json({product})
}

module.exports = {
  getAllProducts,
  getProduct,
}