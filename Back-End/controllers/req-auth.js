const CustomAPIError = require('../errors/custom-error')
const {StatusCodes} = require('http-status-codes')
const Products = require('../models/products')
const User = require('../models/users')


const addProduct = async (req,res)=>{
  const product = await Products.create(req.body)
  res.status(StatusCodes.CREATED).json({product})
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

const createCheckOutSession = async (req, res)=>{
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: req.body.items.map(async (item) =>{
      const product = await Products.findOne({_id:item.id})
      const storeItem = product
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: storeItem.name
          },
          unit_amount: storeItem.price * 100
        },
        quantity: item.quantity
      }
    }),
    success_url: `http://127.0.0.1:5500/Front-End/HTML/success.html`,
    cancel_url:`http://127.0.0.1:5500/Front-End/HTML/cancel.html`
  })
  res.json({url: session.url})
}

module.exports = {
  addProduct,
  deleteProduct,
  modifyProduct,
  addProductToWishList,
  getWishListProducts,
  deleteWishlistedProduct,
}