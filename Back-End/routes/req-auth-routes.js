const {
  addComment,
  addProduct,
  deleteProduct,
  modifyProduct,
  addProductToWishList,
  getWishListProducts,
  deleteWishlistedProduct,
  getUser,
  updateProfilePicture,
  addComment
} = require('../controllers/req-auth')

const express = require('express')
const router = express.Router()

router.route('/comment/:id').post(addComment)
router.route('/admin').post(addProduct)
router.route('/admin/:id').delete(deleteProduct).patch(modifyProduct)
router.route('/wishlist/:id').post(addProductToWishList).patch(deleteWishlistedProduct)
router.route('/wishlist').get(getWishListProducts)
router.route('/:id').get(getUser)
router.route('/:id').patch(updateProfilePicture)
router.route('/comment/:id').post(addComment)
module.exports = router