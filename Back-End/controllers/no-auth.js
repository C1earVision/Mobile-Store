let CustomAPIError = require('../errors/custom-error')
let {StatusCodes} = require('http-status-codes')
let Products = require('../models/products')

let getAllProducts = async (req, res)=>{
  let {name, company, sort, limit} = req.query
  let querys = {}
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

  let page = Number(req.query.page) || 1;
  if(!limit){
    limit = 12
  }
  let skip = (page - 1) * parseInt(limit);
  result = result.skip(skip).limit(parseInt(limit));

  let products = await result 
  let countAll = await Products.count()
  res.status(200).json({countAll, count: products.length, products})
}

// id is inside params object
// products.findOne({})
let getProduct = async (req, res)=>{
  let {id} = req.params
  let product = await Products.findOne({_id:id})
  res.status(200).json({product})
}

module.exports = {
  getAllProducts,
  getProduct,
}