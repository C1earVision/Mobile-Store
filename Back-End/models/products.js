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
    required: [true, 'Please provide the discreption of the Phone'],
    minlength:5,
  },
  specifications:{
    body:{
      dimensions:{
        type:String,
        required: [true, 'Please provide the dimensions of the phone']
      },
      weight:{
        type:Number,
        required: [true, 'Please provide the weight of the phone']
      },
      build:{
        type:String,
        required: [true, 'Please provide the build of the phone']
      },
      Sim:{
        type:String,
        required: [true, 'Please provide the build of the phone']
      }
    },
    display:{
      type:{
        type:String,
        required: [true, 'Please provide the type of the display']
      },
      size:{
        type:String,
        required: [true, 'Please provide the size of the display']
      }
    }
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