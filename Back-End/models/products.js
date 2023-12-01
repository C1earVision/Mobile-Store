const mongoose = require('mongoose')

const ProductsSchema = new mongoose.Schema({
  img:{
    type:String,
    required: [true, 'Please provide the image for the book'],
  },
  name:{
    type:String,
    required: [true, 'Please provide the name of the book'],
    unique:true,
    minlength:5,
  },
  price:{
    type:Number,
    default: 30
  },
  company:{
    type:String,
    required: [true, 'Please provide the genres for the book'],
  },
  description:{
    type:String,
    required: [true, 'Please provide the discreption of the book'],
    minlength:5,
  },
  createdAt:{
    type:Date,
    default: Date.now()
  },
  createdBy:{
    type:mongoose.Types.ObjectId,
    ref:'users',
    requierd:[true, 'Please provide user']
  },
  wishListedBy:{
    type:Array,
    default: []
  }
})



module.exports = mongoose.model('Products', ProductsSchema)