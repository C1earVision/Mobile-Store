const {
  addProduct,
  deleteProduct,
  modifyProduct,
  addProductToWishList,
  getWishListProducts,
  deleteWishlistedProduct,
  getUser
} = require('../controllers/req-auth')

const express = require('express')
const router = express.Router()

router.route('/admin').post(addProduct)
router.route('/admin/:id').delete(deleteProduct).patch(modifyProduct)
router.route('/wishlist/:id').post(addProductToWishList).patch(deleteWishlistedProduct)
router.route('/wishlist').get(getWishListProducts)
router.route('/:name').get(getUser)
module.exports = router