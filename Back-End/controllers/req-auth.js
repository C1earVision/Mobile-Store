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

const createCheckOutSession = async (req, res)=>{
  const {user:{admin}} = req
  if (!admin){
    throw new CustomAPIError('this user has no access to this route', StatusCodes.UNAUTHORIZED)
  }
  const product = await Products.findById({_id: req.body.items[0].id})
  const request = new paypal.orders.OrdersCreateRequest()
  const price = product.price * item.quantity
  request.prefer("return=representation")
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: price,
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: price
            }
          }
        },
        items: {
          name: product.name,
          unit_amount: {
            currency_code: 'USD',
            value: product.price
          },
          quantity: req.body.items.quantity
        }
      }
    ]
  })
  try {
    const order = await paypalClient.execute(request)
  } catch (error) {
    
  }
}






module.exports = {
  addProduct,
  deleteProduct,
  modifyProduct,
  addProductToWishList,
  getWishListProducts,
  deleteWishlistedProduct,
  createCheckOutSession
}