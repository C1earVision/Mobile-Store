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
  if(genre){
    querys.genre = { $regex: genre, $options: 'i'}
  }
  let result = Products.find(querys)
  if(sort){
    sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  }else{
    result = result.sort('-createdAt')
  }
  if(numericFilters){
    const operatorMapper = {
      '>':'$gt',
      '>=':'$gte',
      '=':'$eq',
      '<':'lt',
      '<=':'lte'
    }
    const regEx = /\b(<|>|>=|=|<=)\b/g
    let filters = numericFilters.replace(regEx,(match)=>`-${operatorMapper[match]}-`)
    const options = ['price'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        querys[field] = { [field]: {[operator]: Number(value)} };
        result = result.find(querys[field])
      }
    });
  }
  const page = Number(req.query.page) || 1
  const limit = 6
  const loadmore = page * limit
  result = result.limit(loadmore)

  const products = await result 
  res.status(200).json({count: products.length, products})
}

// id is inside params object
// products.findOne({})
const getProduct = async (req, res)=>{
  try{
    const productId = req.params.id
    const product = await products.findOne({_id:productId})
    res.status(StatusCodes.OK).json({product})
  }
  catch{
    console.error(error);
  }
}

module.exports = {
  getAllProducts,
  getProduct,
}