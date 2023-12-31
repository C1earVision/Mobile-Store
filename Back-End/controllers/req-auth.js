const CustomAPIError = require('../errors/custom-error')
const {StatusCodes} = require('http-status-codes')
const Products = require('../models/products')
const User = require('../models/users')
const ProductsUsed = require('../models/productsUsed')
const Orders = require('../models/orders')
const Excel = require('excel4node');
const fs = require('fs');

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
  if (!admin && !used){
    throw new CustomAPIError('this user has no access to this route', StatusCodes.UNAUTHORIZED)
  }
  const product = used === 'true' ? await ProductsUsed.findByIdAndUpdate({_id:id},req.body,{new:true,runValidators:true}) : await Products.findByIdAndUpdate({_id:id},req.body,{new:true,runValidators:true})
  res.status(StatusCodes.OK).json({product})
}



// Products.deleteOne
const deleteProduct = async(req, res)=>{
  const {params:{id},user:{admin}, query:{used}} = req
  if (!admin && !used) {
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
  const {user:{userId}} = req
  const user = await User.findById({_id:userId})
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

const checkOut = async(req, res)=>{
  const order = await Orders.create(req.body)
  res.status(StatusCodes.CREATED).json({order})
}

const generateReport = async(req, res)=>{
  const wb = new Excel.Workbook();
  const ws = wb.addWorksheet('Sheet 1');

  const orders = await Orders.find({});
  // Sample data - Replace this with your actual data
  // { userName: 'User1', Email: 'asdf', productName: 'ProductA', price: 20 },
  let userData = [];
  let totalPrice = 0
  orders.map((product)=>{
    userData.push({ userName: product.user_name, email: product.user_email, productName: product.item, price: product.price })
    totalPrice += product.price
  })

  // Set up the table headers
  const headerStyle = wb.createStyle({
    font: { bold: true },
  });

  ws.cell(1, 1).string('User Name').style(headerStyle);
  ws.cell(1, 2).string('Email').style(headerStyle);
  ws.cell(1, 3).string('Product Name').style(headerStyle);
  ws.cell(1, 4).string('Price').style(headerStyle);
  ws.cell(1, 5).string('Total Earnings').style(headerStyle);

  // Populate the data rows
  for (let i = 0; i < userData.length; i++) {
    const data = userData[i];
    ws.cell(i + 2, 1).string(data.userName);
    ws.cell(i + 2, 2).string(data.email);
    ws.cell(i + 2, 3).string(data.productName);
    ws.cell(i + 2, 4).number(data.price);
  }
  ws.cell(2, 5).number(totalPrice);
  // Save the Excel file
  const filename = 'report.xlsx';
  wb.write(filename, (err, stats) => {
    if (err) {
      console.error('Error writing Excel file:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.download(filename, (err) => {
        if (err) {
          console.error('Error sending Excel file:', err);
          res.status(500).send('Internal Server Error');
        }
        // Delete the file after sending
        fs.unlinkSync(filename);
      });
    }
  });


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
  addComment,
  checkOut,
  generateReport
}